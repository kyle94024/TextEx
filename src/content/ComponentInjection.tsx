import React from 'react';
import DraggablePopup from './components/DraggablePopup';
import { createRoot } from 'react-dom/client';
// import tailwindUrl from '../index.css'

export function injectComponent() {
  const shadowHost = document.createElement('div');
  shadowHost.setAttribute('id', 'textExShadowHost');
  document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

  // const link = document.createElement('link');
  // link.rel = 'stylesheet';
  // link.href = tailwindUrl;
  // shadowRoot.appendChild(link);

  // const windowContainer = document.createElement('div')
  // windowContainer.id = 'windowContainer'
  // windowContainer.style.position = 'absolute'
  // //windowContainer.style.width = '100%'
  // windowContainer.style.top = '0'
  // //windowContainer.style.height = 'auto'
  // //windowContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.0)' // transparent black color (was used for testing)
  // shadowRoot.appendChild(windowContainer)

  // Inject styles if needed, e.g.:
  // const styleSheet = document.createElement('style');
  // styleSheet.textContent = '/* Your styles here */';
  // shadowRoot.appendChild(styleSheet);

  console.log('Injecting component');
  const root = createRoot(shadowRoot);
  console.log('Root component injected at', shadowRoot)

  root.render(
    <React.StrictMode>
      {/* <link rel = "stylesheet" href={tailwindUrl} /> */}
      <DraggablePopup 
        gptData="Your content here" 
        type="summarize" 
        onClose={() => console.log('Close')} 
        // onLayify={/* your logic here */} 
        onLayify={() => console.log('Layify')}
      />
    </React.StrictMode>
  );
}