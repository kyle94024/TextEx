import { OpenAI } from 'openai'
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources/chat'
import { Stream } from 'openai/streaming'

const openai = new OpenAI({
  apiKey: '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',
})

export default async function gpt_api(
  prompt: string,
  text: string,
  temperature: number = 0.9,
): Promise<string | any> {
  const params: OpenAI.Chat.CompletionCreateParams = {
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: text },
    ],
    model: 'gpt-3.5-turbo',
    temperature: temperature,
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
