import React from 'react';
import WorkspaceSelector from './WorkspaceSelector';
import MainMenu from './MainMenu';
import GlobalMenu from './GlobalMenu';

const Sidebar = () => {
  return (
    <div className="w-72 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Workspace Selector */}
      <div className="px-6 py-6">
        <WorkspaceSelector />
      </div>
      
      {/* Main Menu */}
      <div className="px-6 flex-1">
        <MainMenu />
      </div>
      
      {/* Global Menu */}
      <div className="px-6 pb-6">
        <GlobalMenu />
      </div>
    </div>
  );
};

export default Sidebar; 