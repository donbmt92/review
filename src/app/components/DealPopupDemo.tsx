"use client";

import React, { useState } from 'react';
import DealPopup from './DealPopup';

const DealPopupDemo: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Deal Popup Demo</h1>
      <p>Click the button below to open the deal popup</p>
      
      <button 
        onClick={openPopup}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Open Deal Popup
      </button>

      <DealPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
      />
    </div>
  );
};

export default DealPopupDemo;
