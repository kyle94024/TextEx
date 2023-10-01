chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
  if (request.message === 'layify') createPopup(request.text)
})

function createPopup(gptData: string) {
  // This functions creates the draggable popup on the chrome tab with the gpt data

  console.log('creating the popup')

  // <div id="layify-popup" style="position: fixed; ">gptData</div>

  const popup = document.createElement('div')
  popup.id = 'layify-popup'
  popup.style.position = 'fixed'
  popup.style.top = '0'
  popup.style.right = '0'
  popup.style.width = '300px'
  popup.style.height = '100vh'
  popup.style.backgroundColor = 'white'
  popup.style.zIndex = '1000'
  popup.style.borderLeft = '1px solid black'
  popup.style.borderTop = '1px solid black'
  popup.style.borderBottom = '1px solid black'
  popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)'
  popup.style.overflow = 'scroll'
  popup.style.padding = '10px'
  popup.innerText = gptData

  const closeButton = document.createElement('button')
  closeButton.id = 'layify-close-button'
  closeButton.style.position = 'absolute'
  closeButton.style.top = '0'
  closeButton.style.right = '0'
  closeButton.style.width = '30px'
  closeButton.style.height = '30px'
  closeButton.style.backgroundColor = 'red'
  closeButton.style.border = 'none'
  closeButton.style.borderRadius = '50%'
  closeButton.style.color = 'white'
  closeButton.style.fontSize = '20px'
  closeButton.style.fontWeight = 'bold'
  closeButton.innerText = 'X'

  closeButton.addEventListener('click', () => {
    popup.remove()
  })
  popup.appendChild(closeButton)
  document.body.appendChild(popup)
}
