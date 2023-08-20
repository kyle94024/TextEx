// background.js

import OpenAI from 'openai'
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources/chat/completions'
import { Stream } from 'openai/streaming'

const openai = new OpenAI({
  apiKey: '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',
})

async function pubMedEvaluator(text: string): Promise<string | any> {
  const params: OpenAI.Chat.CompletionCreateParams = {
    messages: [
      { role: 'system', content: 'You are now PubMedGPT and you summarize scientific articles.' },
      { role: 'user', content: `Input: ${text}` },
    ],
    model: 'gpt-3.5-turbo',
  }
  const completion: ChatCompletion | Stream<ChatCompletionChunk> =
    await openai.chat.completions.create(params)
  if ('choices' in completion) {
    // someVariable is of type ChatCompletion
    return completion.choices[0].message.content
  } else {
    return completion
  }
}

// Called when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed or updated.')
  console.log(
    await pubMedEvaluator(
      'Teledermatology means sending pictures of skin lesions or rashes to a specialist for advice on diagnosis or management. It is a way for primary care doctors (general practitioners (GPs)) to get an opinion from a specialist dermatologist without having to refer patients through the normal referral pathway. Teledermatology can involve sending photographs or magnified images of a skin lesion taken with a special camera (dermatoscope) to a skin specialist to look at or it might involve immediate discussion about a skin lesion between a GP and a skin specialist using videoconferencing.',
    ),
  )
  chrome.contextMenus.create({
    documentUrlPatterns: [
      '*://www.ncbi.nlm.nih.gov/pmc/articles/*',
      '*://pubmed.ncbi.nlm.nih.gov/*',
    ],
    contexts: ['selection'],
    id: 'selectedTextCM',
    title: 'Extract Selected Text',
  })
})

// async function runCompletion (text) {

//     const response = await openai.createChatCompletion( {
//     model: 'gpt-3.5-turbo',
//     messages: [
//           {"role": "system", "content": "You are a helpful assistant who summarizes content from scientific articles, either explaining or relacing all jargon as you go along with something a lay person can understand."},

//           {"role": "user", "content": text}
//       ]
//   });
//   return response.data.choices[0].message.content;

// };

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log(info)
  if (info.menuItemId === 'selectedTextCM') {
    //does something
    const text = info.selectionText
    //console.log(await runCompletion(text));
  }
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

// Called when a tab is updated (e.g., a new URL is entered)
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'loading') {
//     injectContentScript(tabId);
//   }
// });

// Function to inject the content script into the specified tab
// function injectContentScript(tabId) {
//   chrome.scripting.executeScript({
//     target: {tabId: tabId},
//     files: ['content-script.js']
//   });
// }

export {}
