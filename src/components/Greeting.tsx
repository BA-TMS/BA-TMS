"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import '../app/globals.css';

const Greeting: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleRedButtonClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 opacity-70 flex items-center justify-center flex-col">
      {showPopup && (
        <div className="absolute bg-white p-4 rounded shadow-lg">
          <p>You picked the wrong button, choose the blue one!</p>
        </div>
      )}

      <h1 className="text-white mb-4">Hello</h1>
      <p className="text-white mb-4">Let's get Started</p>
      <div className="flex justify-center mt-4">
        <button onClick={handleRedButtonClick} className="bg-red-500 text-white mr-2 px-4 py-2 rounded">
          Red Button
        </button>
        <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded">Blue Button</Link>
      </div>
    </div>
  );
};

export default Greeting;
