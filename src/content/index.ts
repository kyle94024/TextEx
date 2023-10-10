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
  console.log(`Mouse position: (${mouseX}, ${mouseY})`)
})

function createPopup(gptData: string) {
  // This functions creates the draggable popup on the chrome tab with the gpt data

  console.log('creating the popup')

  // <div id="layify-popup" style="position: fixed; ">gptData</div>

  // this finds the position of the mouse and creates a popup at that position

  // this creates a draggable popup using tailwindcss functions that displays the gptData passed in
  const draggableBox = document.createElement('div')
  draggableBox.id = 'draggable'
  draggableBox.className = 'absolute w-32 h-32 bg-blue-500 p-4 cursor-move'
  draggableBox.style.left = `${mouseX}px`
  draggableBox.style.top = `${mouseY}px`
  // draggableBox.style.left = '0px' // Initial left position
  // draggableBox.style.top = '0px' // Initial top position
  document.body.appendChild(draggableBox)

  // Create the text inside the draggable box
  const text = document.createElement('p')
  text.textContent = 'Drag me!'
  text.className = 'text-white'
  draggableBox.appendChild(text)

  // Initialize the draggable interaction using interact.js
  interact(draggableBox)
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
