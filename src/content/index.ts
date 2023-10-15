import '../css/index.css'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
  if (request.message === 'layify') createPopup(request.text)
})

import interact from 'interactjs'

let mouseX = 0
let mouseY = 0
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
  //console.log(`Mouse position: (${mouseX}, ${mouseY})`)
})

function createPopup(gptData: string) {
  // This functions creates the draggable popup on the chrome tab with the gpt data

  // let mouseX = 0
  // let mouseY = 0
  // document.addEventListener('mousemove', (event) => {
  //   mouseX = event.clientX
  //   mouseY = event.clientY
  // })
  // console.log('creating the popup')

  function createDraggableWindow() {
    // Create the draggable window container
    const host = document.createElement('div')
    const shadow = host.attachShadow({ mode: 'open' })
    document.body.appendChild(host)

    const windowContainer = document.createElement('div')
    windowContainer.style.position = 'fixed'
    windowContainer.style.top = '0'
    windowContainer.style.left = '0'
    windowContainer.style.width = '100vw'
    windowContainer.style.height = '100vh'
    windowContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)' // Semi-transparent black color
    windowContainer.style.zIndex = '9999' // Adjust the z-index to make sure it appears on top

    shadow.appendChild(windowContainer)

    // Create the draggable window
    const draggableWindow = document.createElement('div')
    draggableWindow.id = 'draggable'
    draggableWindow.className = 'relative bg-red-500 rounded-lg shadow-lg p-6 cursor-move'
    draggableWindow.style.width = '100px'
    draggableWindow.style.height = '100px'
    windowContainer.appendChild(draggableWindow)

    // Create the window title
    const title = document.createElement('h1')
    title.className = 'text-lg font-bold mb-4'
    title.textContent = 'Draggable Window'
    draggableWindow.appendChild(title)

    // Create the window content
    const content = document.createElement('p')
    content.textContent = 'Hello, world!'
    draggableWindow.appendChild(content)

    // Initialize the draggable interaction using interact.js
    interact(draggableWindow)
      .draggable({
        inertia: true, // Enable inertia for smooth dragging
      })
      .on('dragmove', (event) => {
        // Update the element's position based on the drag event
        const target = event.target

        // Calculate new position
        const x = parseFloat(target.style.left || '0') + event.dx
        const y = parseFloat(target.style.top || '0') + event.dy

        // Set the new position
        target.style.left = x + 'px'
        target.style.top = y + 'px'
      })
  }

  createDraggableWindow()
}
