'use client';

import React from 'react';

const CreateBoardButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center space-x-3 bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition-colors"
    >
      <span className="text-sm font-medium">Create new board</span>
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
};

export default CreateBoardButton; 