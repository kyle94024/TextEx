import React, { useState, useRef } from 'react'
import Draggable from 'react-draggable'
import '@assets/css/tailwind.css'

var highestZIndex = 9999;
function findHighestZIndex(elem)
{
  highestZIndex += 1;
  return highestZIndex;
}

export function sendMessageToBackground(message) {
  return new Promise((resolve, reject) => {
    const port = chrome.runtime.connect({ name: 'content-script' })

    // Listen for the response from the background script
    port.onMessage.addListener(function (response) {
      // Clean up the port
      port.disconnect()

      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError)
      } else {
        resolve(response)
      }
    })

    // Send the message to the background script
    port.postMessage(message)
  })
}


function DraggablePopup({gptData, type, onClose, onLayify , posX, posY}) {
  const [minimized, setMinimized] = useState(false)
  const popupRef = useRef(null)

  // TYPE CHECKING
  var bgColor = null
  var borderColor = null

  if (type === 'summarize') {
    console.log('Summarize')
    bgColor = 'bg-red-200'
    borderColor = 'border-red-500'
  } else if (type === 'layify') {
    console.log('Layify')
    bgColor = 'bg-green-200'
    borderColor = 'border-green-500'
  } 

  console.log(`colors: `,`border ${bgColor} ${borderColor} rounded-md shadow-md`)

  // sendMessageToBackground("hello from content script")

  const handleMinimize = (event) => {
    //changes the dimension of the popup to make it smaller
    if (minimized) {
      event.target.parentElement.style.width = '400px'
      event.target.parentElement.style.height = '300px'
      console.log(event.target.parentElement.children[2].children[0])
      event.target.parentElement.children[3].children[0].style.display = "block"
    }
    else {
      event.target.parentElement.style.width = '200px'
      event.target.parentElement.style.height = '50px'
      event.target.parentElement.children[3].children[0].style.display = "none"
      console.log(event.target.parentElement.children[2])
    }
    setMinimized(!minimized)


  }
  console.log("gptData:" + gptData)

  const handleClose = (event) => {
    //close the popup
    onClose(event)
  }

  const handleLayify = async () => {
    if (onLayify) {
      const response = await onLayify(gptData)
      // Handle the response as needed
    }
  }


  // Styling can be derived from the original code
  console.log("pos: ",posX, posY)
  return (
    <div
      style={{ zIndex: '9999', position: 'absolute', top: `${posY-25}px`, left: `${posX-100}px`, width: '0px', height: '0px' }}
      onMouseDown = {(event) => {event.currentTarget.style.zIndex = (findHighestZIndex("*") + 1).toString()}}
    >
      
      <Draggable 
        nodeRef={popupRef}
        
        //style this
        >
        <div ref={popupRef} 
          className="bg-white border border-gray-300 rounded-md shadow-lg"
          style={{ width: '400px', height: '300px'}}
        >

          {/* Close Button */}
          <button 
            style={{ position: "relative", width: '50px', height: '50px', float: 'left', fontSize: '20px', zIndex: "10004"}}
            className="font-semibold text-lg bg-red-400 text-black rounded-sm" 
            onClick={handleClose}>X</button>

          {/* Minimize Button */}

          <button 
            style={{ position: "relative", width: '50px', height: '50px', float: "right", textAlign: 'center', fontSize: '40px',zIndex: "10004"}}
            className="right font-semibold text-lg bg-sky-500 text-black te rounded-sm shadow-sm" 
            onClick={handleMinimize}>{minimized ? '+' : '-'}</button>

          {/* Layify Button (if type is 'summarize')
          {type === 'summarize' && <button onClick={handleLayify}>Lay</button>} */}

          {/* Content */}
          <div
            id = "heading"
            style={{ position: "relative", top: "0px", height: "50px", zIndex: "10003"}}
            className= {`border ${bgColor} ${borderColor} rounded-md shadow-md`}
          >
          </div>

          <div
            id = "contentContainer"
            style={{ position: "relative", top: "0px", height: "245px", zIndex: "10003"}}
            className= "overflow-y-auto"
          >
            <p 
              style = {{position: "absolute", top: "0px", padding: "5px", zIndex: "10005", display: "block"}}
              className = "font-lexend overflow-y-auto"
            >{gptData}</p> 

          </div>
          
        </div>
      </Draggable>
    </div>
  )
}

export default DraggablePopup; sendMessageToBackground
