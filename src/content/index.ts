import { injectComponent } from './ComponentInjection'
import { sendMessageToBackground } from './components/DraggablePopup'
import '@assets/css/tailwind.css'

//injectComponent()

let summarize_button = null
let layify_button = null

document.addEventListener('mouseup', function (event) {
  const selectedText = window.getSelection().toString()
  if (selectedText.length > 0) {
    const mouseX = event.pageX
    const mouseY = event.pageY

    if (!summarize_button) {
      // Create the button if it doesn't exist
      summarize_button = document.createElement('button')
      summarize_button.innerHTML = 'Summarize'
      summarize_button.style.position = 'absolute'
      summarize_button.style.left = mouseX + 'px'
      summarize_button.style.top = mouseY + 'px'
      summarize_button.style.width = '90px'
      summarize_button.style.height = '31px'
      summarize_button.style.overflow = 'hidden'

      summarize_button.addEventListener('mouseover', () => {
        summarize_button.style.backgroundColor = '#ed7b6f' // Change color on mouseover
      })

      // Add event listener for mouseout
      summarize_button.addEventListener('mouseout', () => {
        summarize_button.style.backgroundColor = '#e74c3c' // Change color back on mouseout
      })

      layify_button = document.createElement('button')
      layify_button.innerHTML = 'Layify'
      layify_button.style.position = 'absolute'
      layify_button.style.left = mouseX + 95 + 'px'
      layify_button.style.top = mouseY + 'px'
      layify_button.style.width = '56px'
      layify_button.style.height = '31px'
      layify_button.style.overflow = 'hidden'

      layify_button.addEventListener('mouseover', () => {
        layify_button.style.backgroundColor = '#34ad34' // Change color on mouseover
      })

      layify_button.addEventListener('mouseout', () => {
        layify_button.style.backgroundColor = '#008000' // Change color back on mouseout
      })

      summarize_button.addEventListener('click', async function () {
        // add easing to the width going to 0
        summarize_button.style.transition =
          'width 0.5s ease-in, background-color 0.3s ease, padding 0.4s ease'
        summarize_button.style.width = '0px'
        summarize_button.style.padding = '0px'

        try {
          // Send message to the background script
          summarize_button.style.backgroundColor = '#facac5'
          summarize_button.removeEventListener('mouseover', () => {
            summarize_button.style.backgroundColor = '#ed7b6f' // Change color on mouseover
          })
          summarize_button.removeEventListener('mouseout', () => {
            summarize_button.style.backgroundColor = '#e74c3c' // Change color back on mouseout
          })

          const response = await sendMessageToBackground({
            action: 'callGPTAPI',
            data: { message: 'summarize', text: window.getSelection().toString() },
          })

          // Close the summarize button by making the right edge move accelerate left and then disappear
          // summarize_button.style.transition =
          //   'width 0.5s ease-in, background-color 0.3s ease, padding 0.4s ease'
          // summarize_button.style.width = '0px'
          // summarize_button.style.padding = '0px'

          // setTimeout(() => {
          //   document.body.removeChild(summarize_button)

          // Handle the response
          console.log(response)
          injectComponent('summarize', response.toString())
        } catch (error) {
          console.error('An error occurred:', error)
        }
      })

      layify_button.addEventListener('click', async function () {
        layify_button.style.transition =
          'width 0.5s ease-in, background-color 0.3s ease, padding 0.4s ease'
        layify_button.style.width = '0px'
        layify_button.style.padding = '0px'
        layify_button.style.backgroundColor = '#93ed93'
        try {
          // Send message to the background script
          const response = await sendMessageToBackground({
            action: 'callGPTAPI',
            data: { message: 'layify', text: window.getSelection().toString() },
          })

          // Handle the response
          console.log(response)
          injectComponent('layify', response.toString())
        } catch (error) {
          console.error('An error occurred:', error)
        }
      })

      summarize_button.style.padding = '5px 10px'
      summarize_button.style.fontSize = '14px'
      summarize_button.style.backgroundColor = '#e74c3c' /* Dark background color */
      summarize_button.style.color = '#ecf0f1' /* Light text color */
      summarize_button.style.border = 'none'
      summarize_button.style.borderRadius = '5px'
      summarize_button.style.cursor = 'pointer'
      summarize_button.style.transition = 'background-color 0.3s ease'

      layify_button.style.padding = '5px 10px'
      layify_button.style.fontSize = '14px'
      layify_button.style.backgroundColor = '#008000' /* Dark background color */
      layify_button.style.color = '#ecf0f1' /* Light text color */
      layify_button.style.border = 'none'
      layify_button.style.borderRadius = '5px'
      layify_button.style.cursor = 'pointer'
      layify_button.style.transition = 'background-color 0.3s ease'

      // Append the button to the page
      document.body.appendChild(summarize_button)
      document.body.appendChild(layify_button)
    }
  } else if (summarize_button) {
    // Remove the button if text is not selected
    document.body.removeChild(summarize_button)
    document.body.removeChild(layify_button)
    summarize_button = null
    layify_button = null
  }
})

// Add an additional event listener to remove the button if the user clicks outside of the button
document.addEventListener('mousedown', function (event) {
  if (
    summarize_button &&
    !summarize_button.contains(event.target) &&
    layify_button &&
    !layify_button.contains(event.target)
  ) {
    document.body.removeChild(summarize_button)
    document.body.removeChild(layify_button)
    summarize_button = null
    layify_button = null
  }
})

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
