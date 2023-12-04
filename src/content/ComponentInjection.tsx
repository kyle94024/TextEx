import React from 'react'
import DraggablePopup from './components/DraggablePopup'
import { createRoot } from 'react-dom/client'
import tailwindUrl from '@assets/css/tailwind.css?inline'
import '@assets/css/tailwind.css'

export function injectComponent(type, gptData) {
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

  root.render(
    <React.StrictMode>
      <DraggablePopup
        gptData={gptData}
        type={type}
        onClose={(event) => event.target.parentElement.remove()}
        // onLayify={/* your logic here */}
        onLayify={() => console.log('Layify')}
      />
    </React.StrictMode>,
  )
}
