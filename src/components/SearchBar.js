'use client';

import { useState, useEffect } from 'react';
import useTaskStore from '@/lib/store';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const { setSearchQuery } = useTaskStore();

  // Debounce search to avoid too many re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, setSearchQuery]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search tasks..."
        className="
          block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
          leading-5 bg-white placeholder-gray-500
          focus:outline-none focus:placeholder-gray-400
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          sm:text-sm
        "
      />
    </div>
  );
} 