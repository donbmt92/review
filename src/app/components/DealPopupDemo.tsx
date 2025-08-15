"use client";

import React, { useState } from 'react';
import DealPopup from './DealPopup';

const DealPopupDemo: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Mock product data cho demo
  const mockProduct = {
    title: "Sample Product - Amazing Deal!",
    image: "/image.png",
    discount: "50% OFF",
    asin: "B08N5WRWNW",
    type: "product",
    prps: "demo"
  };

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
        product={mockProduct}
      />
    </div>
  );
};

export default DealPopupDemo;
