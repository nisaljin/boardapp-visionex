'use client';

import React from 'react';
import Image from 'next/image';

const FilterIcon = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
    >
      <Image 
        src="/assets/icons/Grid.png" 
        alt="Filter" 
        width={24} 
        height={24}
      />
    </button>
  );
};

export default FilterIcon; 