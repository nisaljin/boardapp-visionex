import React from 'react';
import WorkspaceSelector from './WorkspaceSelector';
import MainMenu from './MainMenu';
import GlobalMenu from './GlobalMenu';

const Sidebar = () => {
  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden min-h-0">
      {/* Workspace Selector */}
      <div className="px-6 py-6 flex-shrink-0">
        <WorkspaceSelector />
      </div>
      
      {/* Main Menu - Scrollable if needed */}
      <div className="px-6 flex-1 overflow-y-auto min-h-0">
        <MainMenu />
      </div>
      
      {/* Global Menu - Fixed at bottom */}
      <div className="px-6 py-6 flex-shrink-0">
        <GlobalMenu />
      </div>
    </div>
  );
};

export default Sidebar; 