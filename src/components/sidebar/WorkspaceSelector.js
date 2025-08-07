import React from 'react';
import Image from 'next/image';

const WorkspaceSelector = () => {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-3">
        {/* Workspace Image */}
        <div className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/icons/profileuser.png"
            alt="Workspace"
            width={44}
            height={44}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Workspace Info */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">workspace</span>
          <span className="text-sm text-gray-800 font-semibold">Root folder</span>
        </div>
      </div>
      
      {/* Dropdown Arrow */}
      <div className="w-6 h-6 flex items-center justify-center">
        <Image
          src="/assets/icons/Arrow Down.png"
          alt="Dropdown"
          width={32}
          height={32}
          className="opacity-60 icon-crisp object-contain w-6 h-6"
        />
      </div>
    </div>
  );
};

export default WorkspaceSelector; 