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
    <></>
  );
};

export default DealPopupDemo;
