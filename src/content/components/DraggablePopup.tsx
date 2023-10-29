import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

function DraggablePopup({ gptData, type, onClose, onLayify }) {
  const [minimized, setMinimized] = useState(false);
  const popupRef = useRef(null);

  const handleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleLayify = async () => {
    if (onLayify) {
      const response = await onLayify(gptData);
      // Handle the response as needed
    }
  };

  // Styling can be derived from the original code

  return (
    <Draggable nodeRef={popupRef}>
      <div ref={popupRef} /* Additional styling here */>
        {/* Close Button */}
        <button onClick={onClose}>X</button>

        {/* Minimize Button */}
        <button onClick={handleMinimize}>{minimized ? "+" : "-"}</button>

        {/* Layify Button (if type is 'summarize') */}
        {type === 'summarize' && <button onClick={handleLayify}>Lay</button>}

        {/* Content */}
        {!minimized && <p>{gptData}</p>}
      </div>
    </Draggable>
  );
}

export default DraggablePopup;
