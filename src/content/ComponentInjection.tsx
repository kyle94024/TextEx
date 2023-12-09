import React from 'react'
import DraggablePopup from './components/DraggablePopup'
import { createRoot } from 'react-dom/client'
import tailwindUrl from '@assets/css/tailwind.css?inline'
import '@assets/css/tailwind.css'






let mouseX = 0
let mouseY = 0
let relativeMouseX = 0
let relativeMouseY = 0
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
  relativeMouseX = event.pageX
  relativeMouseY = event.pageY
  //console.log(`Mouse position: (${mouseX}, ${mouseY})`)
})

let viewportX = window.scrollX
let viewportY = window.scrollY
window.addEventListener('scroll', () => {
  viewportX = window.scrollX
  viewportY = window.scrollY
  //console.log(`Viewport position: (${viewportX}, ${viewportY})`)
})





export function injectComponent(type, gptData) {
  console.log(mouseX, mouseY, relativeMouseX, relativeMouseY)
  const shadowHost = document.createElement('div')
  shadowHost.setAttribute('id', 'textExShadowHost')
  document.body.appendChild(shadowHost)
  const shadowRoot = shadowHost.attachShadow({ mode: 'open' })

  // create variable to attach the tailwind stylesheet
  let style = document.createElement('style')

  // attach the stylesheet as text
  style.textContent = tailwindUrl

  // apply the style
  shadowRoot.appendChild(style)

  console.log('Injecting component')
  const root = createRoot(shadowRoot)
  console.log('Root component injected at', shadowRoot)

  // set the roots selector to intitial
  console.log("enter: ",mouseX + viewportX, mouseY + viewportY)

  root.render(
    <React.StrictMode>
      <DraggablePopup
        gptData={gptData}
        type={type}
        onClose={(event) => event.target.parentElement.remove()}
        // onLayify={/* your logic here */}
        onLayify={() => console.log('Layify')}
        posX={mouseX + viewportX}
        posY={mouseY + viewportY}
      />
    </React.StrictMode>,
  )
}
