'use client';

import React from 'react';

const NotificationBell = ({ onClick, hasNotifications = true }) => {
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75a6 6 0 006 6h3a6 6 0 006-6V9.75a6 6 0 00-6-6h-3z" />
        </svg>
      </button>
      {/* Notification dot */}
      {hasNotifications && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};

export default NotificationBell; 