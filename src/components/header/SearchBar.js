'use client';

import React from 'react';
import Image from 'next/image';

const SearchBar = ({ placeholder = "Search tasks ...", onSearch }) => {
  return (
    <div className="w-80">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Image 
            src="/assets/icons/Search.svg" 
            alt="Search" 
            width={16} 
            height={16}
            className="text-gray-500"
          />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar; 