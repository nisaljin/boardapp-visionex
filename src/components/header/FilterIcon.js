'use client';

import React from 'react';
import Image from 'next/image';

const FilterIcon = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <Image 
          src="/assets/icons/Grid.png" 
          alt="Filter" 
          width={32} 
          height={32}
          className="icon-crisp object-contain w-6 h-6"
        />
      </div>
    </button>
  );
};

export default FilterIcon; 