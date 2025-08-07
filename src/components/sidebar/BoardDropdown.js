import React, { useState } from 'react';
import Image from 'next/image';

const BoardDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);

  const boards = [
    { name: 'Create routes', isActive: false },
    { name: 'Delepment React App', isActive: false },
    { name: 'Sport Xi Project', isActive: true },
    { name: 'Wordpress theme', isActive: false },
  ];

  return (
    <div className="space-y-3">
      {/* Dropdown Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-5">
          <div className="w-6 h-6 flex items-center justify-center">
            <Image
              src="/assets/icons/Folder.png"
              alt="Boards"
              width={32}
              height={32}
              className={`icon-crisp object-contain w-6 h-6 ${isOpen ? 'icon-blue-alt' : 'opacity-60'}`}
            />
          </div>
          <span className="text-sm font-medium text-custom-blue">
            Boards
          </span>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <Image
            src="/assets/icons/Arrow Down.png"
            alt="Toggle"
            width={32}
            height={32}
            className={`icon-crisp object-contain w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''} ${isOpen ? 'icon-blue-alt' : 'opacity-60'}`}
          />
        </div>
      </button>

      {/* Boards List */}
      {isOpen && (
        <div className="ml-6 space-y-3 border-l-2 border-gray-200 pl-4">
          {boards.map((board, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <Image
                  src="/assets/icons/Arrow Right.png"
                  alt="Board"
                  width={32}
                  height={32}
                  className={`icon-crisp object-contain w-6 h-6 ${board.isActive ? 'icon-blue-alt' : 'opacity-40'}`}
                />
              </div>
              <span className={`text-sm font-medium ${board.isActive ? 'text-custom-blue' : 'text-custom-gray'}`}>
                {board.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardDropdown; 