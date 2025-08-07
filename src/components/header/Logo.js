import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img 
        src="/logo.svg" 
        alt="Board App Logo" 
        className="w-6 h-6"
      />
      <div className="text-lg font-semibold">
        <span className="text-gray-700">Board</span>
        <span className="text-[#3772FF]"> App</span>
      </div>
    </div>
  );
};

export default Logo; 