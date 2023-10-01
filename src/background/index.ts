// background.js

import OpenAI from 'openai'
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources/chat/completions'
import { Stream } from 'openai/streaming'
import { gpt_api } from './gpt/api'
import { SUMMARIZE_PROMPT } from './gpt/prompts/summarize'
import { LAYIFY_PROMPT } from './gpt/prompts/lay-ify'

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
      break
    case 'Lay-ifyCM':
      console.log(info.selectionText)
      const gptResponse = await gpt_api(LAYIFY_PROMPT, info.selectionText)

      chrome.tabs.sendMessage(tab?.id ?? 0, { message: 'layify', text: gptResponse })
      break
    default:
      console.error('Invalid menu item ID passed to processMenuClick', info.menuItemId)
  }
}

export {}
