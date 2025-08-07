'use client';

import React from 'react';
import Image from 'next/image';

const NotificationBell = ({ onClick, hasNotifications = true }) => {
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <Image 
          src="/assets/icons/Bell.svg" 
          alt="Notifications" 
          width={24} 
          height={24}
        />
      </button>
      {/* Notification dot */}
      {hasNotifications && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
      )}
    </div>
  );
};

export default NotificationBell; 