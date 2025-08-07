'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/sidebar';
import { ProjectHeading } from '@/components/board';

export default function Home() {
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  const handleCreateBoard = () => {
    console.log('Create new board clicked');
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleNotifications = () => {
    console.log('Notifications clicked');
  };

  const handleUserProfile = () => {
    console.log('User profile clicked');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header - Centered */}
      <div className="flex justify-center">
        <Header 
          onSearch={handleSearch}
          onCreateBoard={handleCreateBoard}
          onFilter={handleFilter}
          onNotifications={handleNotifications}
          onUserProfile={handleUserProfile}
        />
      </div>
      
      {/* Main Content with Sidebar */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Content Area */}
        <main className="flex-1 bg-gray-50">
          <ProjectHeading />
        </main>
      </div>
    </div>
  );
}
