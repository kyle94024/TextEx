import { gpt_api } from '../background/gpt/api'
import { LAYIFY_PROMPT } from '../background/gpt/prompts/lay-ify'
import { SUMMARIZE_PROMPT } from '../background/gpt/prompts/summarize'

//on install, do the following
// chrome.runtime.onInstalled.addListener(async () => {
//   var result = await gpt_api('Say hellow world!', 'input text')
//   console.log(result)
//   result = await gpt_api(LAYIFY_PROMPT, 'The magnitude of the vector is uncomrehensible.')
//   console.log(result)
//   result = await gpt_api(
//     SUMMARIZE_PROMPT,
//     'The magnitude of the vector is uncomprehensible and truly astounding.',
//   )
//   console.log(result)
// })
