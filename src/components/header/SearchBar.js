'use client';

import React from 'react';
import Image from 'next/image';

const SearchBar = ({ placeholder = "Search tasks ...", onSearch }) => {
  return (
    <div className="w-60">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div 
            className="w-4 h-4"
            style={{
              WebkitMask: 'url(/assets/icons/Search.png) no-repeat center',
              WebkitMaskSize: 'contain',
              mask: 'url(/assets/icons/Search.png) no-repeat center',
              maskSize: 'contain',
              backgroundColor: '#B1B5C3'
            }}
          />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="block w-full h-12 pl-10 pr-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
          style={{ 
            borderRadius: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            fontWeight: '400'
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar; 