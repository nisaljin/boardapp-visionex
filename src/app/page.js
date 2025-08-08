'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/sidebar';
import Board from '@/components/board';
import HydrationWrapper from '@/components/HydrationWrapper';
import useBoardStore from '@/lib/store';

export default function Home() {
  const { setSearchQuery } = useBoardStore();

  const handleSearch = (searchTerm) => {
    // console.log('Searching for:', searchTerm);
    setSearchQuery(searchTerm);
  };

  const handleCreateBoard = () => {
    // Create new board functionality
  };

  const handleFilter = () => {
    // Filter functionality
  };

  const handleNotifications = () => {
    // Notifications functionality
  };

  const handleUserProfile = () => {
    // User profile functionality
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
