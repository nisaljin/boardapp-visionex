import React from 'react';
import Image from 'next/image';

const MenuItem = ({ 
  icon, 
  text, 
  isActive = false, 
  hasNotification = false, 
  notificationCount = null,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-gray-800' 
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-5">
        <div className="w-6 h-7 flex items-center justify-center">
          <Image
            src={icon}
            alt={text}
            width={32}
            height={32}
            className={`icon-crisp object-contain max-w-6 max-h-7 ${isActive ? 'icon-white' : text === 'Messages' ? 'icon-fill-gray' : 'opacity-70'}`}
          />
        </div>
        <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-custom-gray'}`}>
          {text}
        </span>
      </div>
      
      {hasNotification && notificationCount && (
        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-medium">{notificationCount}</span>
        </div>
      )}
    </button>
  );
};

export default MenuItem; 