'use client';

import React from 'react';
import Image from 'next/image';

const CreateBoardButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center space-x-3 bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition-colors"
    >
      <span className="text-sm font-medium">Create new board</span>
      <Image 
        src="/assets/icons/Plus 2.svg" 
        alt="Plus" 
        width={20} 
        height={20}
        className="filter brightness-0 invert"
      />
    </button>
  );
};

export default CreateBoardButton; 