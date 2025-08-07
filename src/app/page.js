'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/sidebar';
import Board from '@/components/board';
import HydrationWrapper from '@/components/HydrationWrapper';

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
    <HydrationWrapper>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header - Fixed height */}
        <div className="flex justify-center flex-shrink-0">
          <Header 
            onSearch={handleSearch}
            onCreateBoard={handleCreateBoard}
            onFilter={handleFilter}
            onNotifications={handleNotifications}
            onUserProfile={handleUserProfile}
          />
        </div>
        
        {/* Main Content with Sidebar */}
        <div className="flex-1 flex min-h-0">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Content Area */}
          <main className="flex-1 bg-white overflow-hidden">
            <Board />
          </main>
        </div>
      </div>
    </HydrationWrapper>
  );
}
