// SplashScreen.js
import React from 'react';

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-600 text-white">
      <div className="text-4xl italic font-bold flex items-center">
        <span>ticketmaster</span>
        <span className="ml-2 text-2xl">®</span>
      </div>
    </div>
  );
}
