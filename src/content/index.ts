import { injectComponent } from './ComponentInjection'

//injectComponent()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
  if (request.message === 'layify') {
    console.log('request: ' + request)
    injectComponent('layify', request.text)
  }
  if (request.message === 'summarize') {
    injectComponent('summarize', request.text)
  }
})
