'use client';

import React from 'react';
import Image from 'next/image';

const CreateBoardButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center bg-[#3772FF] text-white hover:bg-blue-600 transition-colors font-poppins font-semibold text-xs"
      style={{
        width: '170px',
        height: '48px',
        padding: '4px 12px',
        borderRadius: '6px',
        gap: '12px'
      }}
    >
      <span className="text-white text-left">
        Create new board
      </span>
      <Image 
        src="/assets/icons/Plus 2.png" 
        alt="Plus" 
        width={48} 
        height={48}
        className="filter brightness-0 invert w-6 h-6"
      />
    </button>
  );
};

export default CreateBoardButton; 