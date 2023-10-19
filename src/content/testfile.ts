import { gpt_api } from '../background/gpt/api'

var result = await gpt_api('Say hellow world!')
console.log(result)
result = await gpt_api('say banana')
console.log(result)
