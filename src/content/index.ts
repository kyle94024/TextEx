chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
  if (request.message === 'layify') {
    createPopup(request.text, 'Layify: ')
  }
  if (request.message === 'summarize') {
    createPopup(request.text, 'Summary: ')
  }
})

import interact from 'interactjs'

let mouseX = 0
let mouseY = 0
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
  //console.log(`Mouse position: (${mouseX}, ${mouseY})`)
})

const viewportX = window.scrollX
const viewportY = window.scrollY
console.log(`Viewport position: (${viewportX}, ${viewportY})`)

function createPopup(gptData: string, type: string) {
  function createDraggableWindow() {
    // Create the draggable window container
    const windowContainer = document.createElement('div')
    windowContainer.id = 'windowContainer'
    windowContainer.style.position = 'absolute'
    windowContainer.style.width = '100%'
    windowContainer.style.top = '0'
    windowContainer.style.height = '100%'
    windowContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.25)' // Semi-transparent black color
    windowContainer.style.zIndex = '9999' // Adjust the z-index to make sure it appears on top

    document.body.appendChild(windowContainer)

    // Create the draggable window
    const draggableWindow = document.createElement('div')
    draggableWindow.id = 'draggableElement'
    draggableWindow.style.position = 'absolute'
    draggableWindow.style.width = '15rem'
    draggableWindow.style.height = '25rem'
    draggableWindow.style.backgroundColor = 'rgba(255, 255, 255, 0.80)'
    draggableWindow.style.border = '1px solid black'
    draggableWindow.style.padding = '10px'
    draggableWindow.style.cursor = 'move'
    windowContainer.appendChild(draggableWindow)

    // Create the window content
    const title = document.createElement('p')
    title.textContent = type
    draggableWindow.appendChild(title)

    const content = document.createElement('p')
    content.textContent = gptData
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

// const draggableElement = document.getElementById('draggableElement') as HTMLElement

// function updatePosition() {
//   // Manually set the position of the element
//   const newX = mouseX // Specify your desired X-coordinate here
//   const newY = mouseY // Specify your desired Y-coordinate here
//   if (draggableElement) {
//     draggableElement.style.left = newX + 'px'
//     draggableElement.style.top = newY + 'px'
//   }
// }
