import { gpt_api } from '../background/gpt/api'
import { SUMMARIZE_PROMPT } from '../background/gpt/prompts/summarize'
import { LAYIFY_PROMPT } from '../background/gpt/prompts/lay-ify'

// This file contains the content script that is injected into the page (the DOM).
// It listens for messages from the extension and creates the draggable window/popup.

// track the number of popups created
let numberOfPopupsCreated = 0

function destructor() {
  // I do this because the content script errors when injected into the page twice
  // Destruction is needed only once
  document.removeEventListener(destructionEvent, destructor)
  // Tear down content script: Unbind events, clear timers, restore DOM, etc.

  // Remove the window containers
  for (let i = 0; i < numberOfPopupsCreated; i++) {
    const windowContainer = document.getElementById('windowContainer' + i)
    if (windowContainer) {
      document.body.removeChild(windowContainer)
    }
  }
}

var destructionEvent = 'destructmyextension_' + chrome.runtime.id
// Unload previous content script if needed
document.dispatchEvent(new CustomEvent(destructionEvent))
document.addEventListener(destructionEvent, destructor)

// Listens for messages from the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
  if (request.message === 'layify') {
    createPopup(request.text, 'layify')
  }
  if (request.message === 'summarize') {
    createPopup(request.text, 'summarize')
  }
})

// import interact.js
import interact from 'interactjs'

// track the mouse position relative to the viewport
let mouseX = 0
let mouseY = 0
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
  //console.log(`Mouse position: (${mouseX}, ${mouseY})`)
})

// track the viewport position relative to the document
let viewportX = window.scrollX
let viewportY = window.scrollY
window.addEventListener('scroll', () => {
  viewportX = window.scrollX
  viewportY = window.scrollY
  //console.log(`Viewport position: (${viewportX}, ${viewportY})`)
})

// Create the draggable window
function createPopup(gptData: string, type: string) {
  function createDraggableWindow() {
    // Create the draggable window container
    const windowContainer = document.createElement('div')
    windowContainer.id = 'windowContainer' + numberOfPopupsCreated
    windowContainer.style.position = 'absolute'
    windowContainer.style.width = '100%'
    windowContainer.style.top = '0'
    windowContainer.style.height = '5px'
    windowContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.0)' // transparent black color (was used for testing)
    windowContainer.style.zIndex = '9999' // Adjust the z-index to make sure it appears on top

    // Append the window container to the body
    document.body.appendChild(windowContainer)

    // Create the draggable window
    const draggableWindow = document.createElement('div')
    draggableWindow.id = 'draggableElement' + numberOfPopupsCreated++
    draggableWindow.style.position = 'absolute'

    // Creates the content
    const content = document.createElement('p')
    content.id = 'draggableContent' + numberOfPopupsCreated
    content.textContent = gptData
    content.style.top = '1.5rem'
    content.style.paddingTop = '1rem'
    draggableWindow.appendChild(content)

    // Using information about the content, continues formatting draggable Window

    // Calculate the width of the draggable window based on the length of the content
    const contentLength = gptData.length
    const remToAddW = Math.min(Math.floor(contentLength / 4), 15 * 20) // Add one rem every 100 characters, up to a max of 25
    draggableWindow.style.width = 15 * 20 + remToAddW + 'px'

    // Calculate the height of the draggable window based on the length of the content
    const remToAddH = Math.min(Math.floor(contentLength / 1.5), 23 * 20) // Add one rem every 15 characters, up to a max of 20
    draggableWindow.style.height = 3 * 20 + remToAddH + 'px'

    // Sets the height of the content until the scrollbar is needed
    content.style.maxHeight = 3 * 16 + remToAddH + 'px'
    content.style.overflowY = 'auto'

    // Finish formatting draggable window
    if (type === 'layify') {
      // Change the color of the draggable window based on the type of popup
      draggableWindow.style.backgroundColor = 'rgba(205, 255, 205, 0.90)'
    } else if (type === 'summarize') {
      draggableWindow.style.backgroundColor = 'rgba(255, 205, 205, 0.90)'
    } else if (type === 'laymmarize') {
      draggableWindow.style.backgroundColor = 'rgba(230, 230, 255, 0.90)'
    }
    draggableWindow.style.border = '1px solid black'
    draggableWindow.style.padding = '10px'
    draggableWindow.style.cursor = 'move'
    draggableWindow.style.left = viewportX + mouseX + 'px'
    draggableWindow.style.top = viewportY + mouseY + 'px'
    draggableWindow.style.zIndex = '' + 9999 // Adjust the z-index to make sure it appears on top
    windowContainer.appendChild(draggableWindow)

    // Create the close button
    const closeButton = document.createElement('button')
    closeButton.style.position = 'absolute'
    closeButton.style.top = '5px'
    closeButton.style.right = '5px'
    closeButton.style.backgroundColor = 'rgb(255, 255, 255, 0.8)'
    closeButton.style.color = 'white'
    closeButton.style.border = 'none'
    closeButton.style.borderRadius = '5px'
    closeButton.style.width = '40px'
    closeButton.style.height = '22px'

    closeButton.style.cursor = 'pointer'
    closeButton.style.paddingTop = '1px'

    // Add the close button text
    const closeButtonText = document.createElement('p')
    closeButtonText.textContent = 'X'
    closeButtonText.style.color = 'red'
    closeButtonText.style.fontSize = '10px'
    closeButtonText.style.fontWeight = 'bold'
    closeButton.appendChild(closeButtonText)

    draggableWindow.appendChild(closeButton)

    // Create the minimize button
    const minimizeButton = document.createElement('button')
    minimizeButton.style.position = 'absolute'
    minimizeButton.style.top = '5px'
    minimizeButton.style.left = '5px'
    minimizeButton.style.backgroundColor = 'rgb(255, 255, 255, 0.8)'
    minimizeButton.style.color = 'white'
    minimizeButton.style.border = 'none'
    minimizeButton.style.borderRadius = '5px'
    minimizeButton.style.width = '40px'
    minimizeButton.style.height = '22px'
    minimizeButton.style.fontSize = '10px'
    minimizeButton.style.fontWeight = 'bold'
    minimizeButton.style.cursor = 'pointer'
    minimizeButton.style.paddingTop = '1px'
    draggableWindow.appendChild(minimizeButton)

    // Add the minimize button text
    const minimizeButtonText = document.createElement('p')
    minimizeButtonText.textContent = '-'
    minimizeButtonText.style.color = 'gray'
    minimizeButtonText.style.fontSize = '15px'
    minimizeButtonText.style.fontWeight = 'bold'
    minimizeButton.appendChild(minimizeButtonText)

    // // Create the lay button if the type is "summarize"
    // if (type === 'summarize') {
    //   const layButton = document.createElement('button')
    //   layButton.style.position = 'absolute'
    //   layButton.style.top = '5px'
    //   layButton.style.left = '50px'
    //   layButton.style.backgroundColor = 'rgb(230, 230, 255, 0.90)'
    //   layButton.style.color = 'white'
    //   layButton.style.border = 'none'
    //   layButton.style.borderRadius = '5px'
    //   layButton.style.width = '40px'
    //   layButton.style.height = '22px'
    //   layButton.style.fontSize = '10px'
    //   layButton.style.fontWeight = 'bold'
    //   layButton.style.cursor = 'pointer'
    //   layButton.style.paddingTop = '1px'
    //   layButton.textContent = 'Lay'
    //   layButton.style.color = 'black'
    //   draggableWindow.appendChild(layButton)

    // // Add event listener for the lay button
    // layButton.addEventListener('click', () => {
    //   console.log('lay button clicked')
    //   // generatePopup(content.textContent!)
    // })
    // }
    // Add event listener for the close button

    closeButton.addEventListener('click', () => {
      windowContainer.removeChild(draggableWindow)
    })

    // Add event listener for the minimize button
    minimizeButton.addEventListener('click', () => {
      // Toggle the height of the draggable window
      if (draggableWindow.style.height === '2rem') {
        draggableWindow.style.width = 15 * 20 + remToAddW + 'px'
        draggableWindow.style.height = 3 * 20 + remToAddH + 'px'
        content.style.display = 'block'
      } else {
        //const remToAddH = Math.min(Math.floor(contentLength / 30), 20) // Add one rem every 15 characters, up to a max of 20
        draggableWindow.style.height = '2rem'
        draggableWindow.style.width = '10rem'
        content.style.display = 'none'
      }
    })

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

        // Update the z-index
        setZIndex(target)
      })
  }

  // Listens for a click, then subtracts the z-index of every other "draggableElement{number}" by 1, while setting the z-index of the current element clicked on to 9999
  document.addEventListener('mousedown', (event) => {
    const target = event.target as HTMLElement // Cast event.target to HTMLElement
    //checks if the target is a draggable element, and if so, sets the z index to 9999
    console.log(target.id)
    if (target.id.includes('draggableElement')) {
      setZIndex(target)
    } else if (target.id.includes('draggableContent')) {
      setZIndex(target.parentElement!)
    }
  })

  // Create the draggable window
  createDraggableWindow()
}

// async function generatePopup(text: string) {
//   const gptResponse = await gpt_api(text)
//   createPopup(gptResponse, 'laymmaize')
// }

// Takes in the target element, and sets the z index of the target element to 9999, and subtracts 1 from every other draggable element
// This makes sure that the target element is on top of every other draggable element, good for overlapping elements
function setZIndex(target: HTMLElement) {
  target.style.zIndex = '9999'
  const windowContainer = target.parentElement as HTMLElement // Get the parent element (window container)
  windowContainer.style.zIndex = '9999'

  for (let i = 0; i < numberOfPopupsCreated; i++) {
    const otherDraggableElement = document.getElementById('draggableElement' + i)
    if (otherDraggableElement && otherDraggableElement !== target) {
      otherDraggableElement.style.zIndex = (
        parseInt(otherDraggableElement.style.zIndex) - 1
      ).toString()
      otherDraggableElement.parentElement!.style.zIndex = otherDraggableElement.style.zIndex
    }
  }
}

document.addEventListener('mouseup', (event) => {
  if (window.getSelection() && window.getSelection().toString()){
    var textselect = document.createElement("div");
    textselect.style.position = "fixed";
    const content = window.getSelection().toString();
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    textselect.style.bottom = String(vh - mouseY) + "px";
    textselect.style.left = String(mouseX) + "px";
    textselect.style.zIndex = "9999";
    textselect.style.fontSize = "1vh";
    textselect.innerText = "Click to Summarize";
    textselect.style.color = "#FFF"
    textselect.style.background = "rgba(0,0,0,0.5)";
    textselect.style.borderRadius = "1vh";
    textselect.style.padding = "0.5vh";
    textselect.setAttribute("id", "summarizeFloater");
    textselect.style.cursor = "pointer";
    textselect.style.textDecoration = "underline";
    textselect.addEventListener('click', () => {
      console.log(content);
      // chrome.runtime.sendMessage({text: content}).then(result => console.log(result))
      (async () => {
        const response = await chrome.runtime.sendMessage({text: content});
        createPopup(response["text"], "summarize");
        const element = document.querySelector("#summarizeFloater");
        element.remove()
      })();
    })
    console.log(window.getSelection().toString());
    document.body.appendChild(textselect);
  }
  //console.log(`Mouse position: (${mouseX}, ${mouseY})`)
})
document.addEventListener('click', function(event){
  const element = document.querySelector("#summarizeFloater");
  const x = event.target
  if (!window.getSelection() || !window.getSelection().toString()){
  if (!element?.contains((<HTMLElement> event.target))){
    element.remove();
    // console.log("Test")
  }
}
})