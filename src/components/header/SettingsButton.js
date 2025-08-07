'use client';

import React from 'react';

const SettingsButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
    >
      <div 
        className="w-6 h-6"
        style={{
          WebkitMask: 'url(/assets/icons/Settings.png) no-repeat center',
          WebkitMaskSize: 'contain',
          mask: 'url(/assets/icons/Settings.png) no-repeat center',
          maskSize: 'contain',
          backgroundColor: '#B1B5C3'
        }}
      />
    </button>
  );
};

export default SettingsButton; 