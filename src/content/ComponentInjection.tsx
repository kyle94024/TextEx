import React from 'react';
import DraggablePopup from './components/DraggablePopup';
import { createRoot } from 'react-dom/client';

export function injectComponent() {
  const shadowHost = document.createElement('div');
  shadowHost.setAttribute('id', 'textExShadowHost');
  document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

  // Inject styles if needed, e.g.:
  // const styleSheet = document.createElement('style');
  // styleSheet.textContent = '/* Your styles here */';
  // shadowRoot.appendChild(styleSheet);

  console.log('Injecting component');
  const root = createRoot(shadowRoot);
  console.log('Root component injected at', shadowRoot)

  root.render(
    <React.StrictMode>
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