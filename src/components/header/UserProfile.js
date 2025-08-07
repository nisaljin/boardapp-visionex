'use client';

import React from 'react';

const UserProfile = ({ onClick, imageUrl, userName }) => {
  return (
    <div 
      onClick={onClick}
      className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={userName || "User"} 
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )}
    </div>
  );
};

export default UserProfile; 