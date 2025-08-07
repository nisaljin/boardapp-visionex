'use client';

import React from 'react';

const NotificationBell = ({ onClick, hasNotifications = true }) => {
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <div 
          className="w-6 h-6"
          style={{
            WebkitMask: 'url(/assets/icons/Bell.png) no-repeat center',
            WebkitMaskSize: 'contain',
            mask: 'url(/assets/icons/Bell.png) no-repeat center',
            maskSize: 'contain',
            backgroundColor: '#B1B5C3'
          }}
        />
      </button>
      {/* Notification dot */}
      {hasNotifications && (
        <div className="absolute top-3 right-2.5 w-2 h-2 bg-orange-500 rounded-full"></div>
      )}
    </div>
  );
};

export default NotificationBell; 