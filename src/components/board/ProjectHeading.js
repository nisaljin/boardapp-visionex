import React from 'react';
import Image from 'next/image';

const ProjectHeading = () => {
  return (
    <div className="w-full bg-white">
      {/* Project Title and Status Row */}
      <div className="flex items-center space-x-6 mb-2 p-6">
        {/* Project Title */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Sport Xi Project
        </h1>
        
        {/* Status Label */}
        <div className="bg-orange-500 text-white px-3 py-1 rounded-md text-xs font-medium">
          In progress
        </div>
      </div>
      
      {/* Project Description */}
      <p className="text-gray-500 text-base mb-4 px-6">
        event production
      </p>
      
      {/* Assigned Users and Manage Button Row */}
      <div className="flex items-center px-6">
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 text-sm">assigned</span>
          
          {/* User Avatars - Overlapping */}
          <div className="flex items-center">
            {/* User 1 */}
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center relative z-0 overflow-hidden">
              <Image 
                src="/assets/icons/assigneduser.png" 
                alt="User 1" 
                width={32} 
                height={32}
                className="object-cover"
              />
            </div>
            
            {/* User 2 */}
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center relative -ml-3 z-10 overflow-hidden">
              <Image 
                src="/assets/icons/assigneduser.png" 
                alt="User 2" 
                width={32} 
                height={32}
                className="object-cover"
              />
            </div>
            
            {/* User 3 */}
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center relative -ml-3 z-20 overflow-hidden">
              <Image 
                src="/assets/icons/assigneduser.png" 
                alt="User 3" 
                width={32} 
                height={32}
                className="object-cover"
              />
            </div>
            
            {/* +2 More Users */}
            <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center relative -ml-3 z-30">
              <span className="text-sm text-gray-600 font-semibold">+2</span>
            </div>
          </div>
        </div>
        
        {/* Manage Button - Now positioned next to assigned users */}
        <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors ml-6">
          <span className="text-sm text-gray-600">Manage</span>
          <Image 
            src="/assets/icons/Pencil.png" 
            alt="Edit" 
            width={14} 
            height={14}
            className="opacity-60"
          />
        </div>
      </div>
      
      {/* Divider Line */}
      <div className="w-full h-px bg-gray-200 my-6 mx-6"></div>
      
      {/* Last Updated */}
      <div className="text-gray-500 text-sm px-6 pb-6">
        Last updated on: 04 April, 2022
      </div>
    </div>
  );
};

export default ProjectHeading; 