// background.js

import OpenAI from 'openai'
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources/chat/completions'
import { Stream } from 'openai/streaming'
import { gpt_api } from './gpt/api'
import { SUMMARIZE_PROMPT } from './gpt/prompts/summarize'

// Function to create chrome context menu for GPT Actions
async function createContextMenu(): Promise<void> {
  // Create main context menu to add submenu to
  const mainContextMenu = await chrome.contextMenus.create({
    documentUrlPatterns: ['<all_urls>'],
    contexts: ['all'],
    id: 'mainCM',
    title: 'PubMedGPT', //change later
  })

  // For loop to create submenu items, creates listener for each submenu item
  const actions = ['summarize', 'explain']
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

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url?.startsWith('chrome://')) return undefined
  if (tab.url?.startsWith('https://pubmed.ncbi.nlm.nih.gov/')) {
    // chrome.scripting.executeScript({
    //   target: {tabId: tab.id},
    //   files: ['content-script.js']
    // });
  }
  if (tab.url?.startsWith('https://www.ncbi.nlm.nih.gov/pmc/articles/')) {
    if (tab.id) {
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'getSelectedText',
      })
      console.log(response)
    }
  }
})

async function processMenuClick(
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab | undefined,
) {
  switch (info.menuItemId) {
    case 'summarizeCM':
      console.log(info.selectionText)
      console.log(await gpt_api(SUMMARIZE_PROMPT, info.selectionText))
      break
    case 'explainCM':
      console.log(info.selectionText)
      // console.log(await gpt_api(EXPLAIN_PROMPT, info.selectionText))
      break
    default:
      console.error('Invalid menu item ID passed to processMenuClick', info.menuItemId)
  }
}

export {}
