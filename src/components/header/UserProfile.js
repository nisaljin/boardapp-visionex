'use client';

import React from 'react';
import Image from 'next/image';

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
        <Image 
          src="/assets/icons/profileuser.png" 
          alt="User Profile" 
          width={16} 
          height={16}
          className="filter brightness-0 invert"
        />
      )}
    </div>
  );
};

export default UserProfile; 