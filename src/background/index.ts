// background.js

import OpenAI from 'openai'
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources/chat/completions'
import { Stream } from 'openai/streaming'
import { gpt_api } from './gpt/api'
import { SUMMARIZE_PROMPT } from './gpt/prompts/summarize'
import { LAYIFY_PROMPT } from './gpt/prompts/lay-ify'


chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async function (msg) {
    if (msg.action === 'callGPTAPI') {
      try {
        // Perform the GPT API call
        const result = await gpt_api(SUMMARIZE_PROMPT, msg.data.text);

        // Send the result back to the content script
        console.log(result);
        port.postMessage(result);
      } catch (error) {
        // Handle errors if needed
        console.error('Error in background script:', error);
        port.postMessage({ error: 'An error occurred' });
      }
    }
  });
});



// Disconnect and reinject content script on install (for dev purposes)
chrome.runtime.onInstalled.addListener(async () => {
  for (const cs of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({ url: cs.matches })) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: cs.js,
      })
    }
  }
})

// Function to create chrome context menu for GPT Actions
async function createContextMenu(): Promise<void> {
  // Create main context menu to add submenu to
  const mainContextMenu = await chrome.contextMenus.create({
    documentUrlPatterns: ['<all_urls>'],
    contexts: ['all'],
    id: 'mainCM',
    title: 'TextEx', //change later
  })

  // For loop to create submenu items, creates listener for each submenu item
  const actions = ['summarize', 'Lay-ify']
  for (const action of actions) {
    const actionCM = await chrome.contextMenus.create({
      documentUrlPatterns: ['<all_urls>'],
      contexts: ['all'],
      id: `${action}CM`,
      title: action,
      parentId: mainContextMenu,
    })
  }
  //creates listener for selectedTextCM
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    await processMenuClick(info, tab)
  })
}

// Called when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed or updated.')
  await createContextMenu()
})

async function processMenuClick(
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab | undefined,
) {
  switch (info.menuItemId) {
    case 'summarizeCM':
      console.log(info.selectionText)
      //console.log(await gpt_api(SUMMARIZE_PROMPT, info.selectionText))
      chrome.tabs.sendMessage(tab?.id ?? 0, {
        message: 'summarize',
        text: await gpt_api(SUMMARIZE_PROMPT, info.selectionText),
      })
      break
    case 'Lay-ifyCM':
      console.log(info.selectionText)

      chrome.tabs.sendMessage(tab?.id ?? 0, {
        message: 'layify',
        text: await gpt_api(LAYIFY_PROMPT, info.selectionText),
      })
      break
    default:
      console.error('Invalid menu item ID passed to processMenuClick', info.menuItemId)
  }
}

export { }
