'use client';

import Header from '@/components/Header';

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
      <Header 
        onSearch={handleSearch}
        onCreateBoard={handleCreateBoard}
        onFilter={handleFilter}
        onNotifications={handleNotifications}
        onUserProfile={handleUserProfile}
      />
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">
          Content area - Add components here gradually
        </div>
      </main>
    </div>
  );
}
