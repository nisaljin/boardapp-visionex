'use client';

import React from 'react';
import {
  Logo,
  SearchBar,
  CreateBoardButton,
  FilterIcon,
  NotificationBell,
  UserProfile
} from './header/index';

const Header = ({ 
  onSearch, 
  onCreateBoard, 
  onFilter,
  onNotifications, 
  onUserProfile,
  hasNotifications = true,
  userImageUrl,
  userName
}) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Logo */}
        <Logo />

        {/* Center - Create Board Button and Search Bar */}
        <div className="flex items-center space-x-4 flex-1 justify-center">
          <CreateBoardButton onClick={onCreateBoard} />
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Right side - Filter, Notifications, User Profile */}
        <div className="flex items-center space-x-4">
          <FilterIcon onClick={onFilter} />
          <NotificationBell onClick={onNotifications} hasNotifications={hasNotifications} />
          <UserProfile 
            onClick={onUserProfile} 
            imageUrl={userImageUrl} 
            userName={userName} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 