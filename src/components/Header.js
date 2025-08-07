'use client';

import React from 'react';
import {
  Logo,
  SearchBar,
  CreateBoardButton,
  FilterIcon,
  NotificationBell,
  UserProfile,
  SettingsButton
} from './header/index';

const Header = ({ 
  onSearch, 
  onCreateBoard, 
  onFilter,
  onNotifications, 
  onUserProfile,
  onSettings,
  hasNotifications = true,
  userImageUrl,
  userName
}) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Logo */}
        <Logo />

        {/* Center - Create Board Button, Search Bar, and Settings */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <CreateBoardButton onClick={onCreateBoard} />
          <SearchBar onSearch={onSearch} />
          <div className="w-2"></div> 
          <SettingsButton onClick={onSettings} />
        </div>

        {/* Right side - Notifications and User Profile */}
        <div className="flex items-center">
          <NotificationBell onClick={onNotifications} hasNotifications={hasNotifications} />
          <div className="w-2"></div>
          <UserProfile 
            onClick={onUserProfile} 
            imageUrl={userImageUrl || '/assets/icons/profileuser.png'} 
            userName={userName} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 