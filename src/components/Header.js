'use client';

import React from 'react';
import {
  Logo,
  SearchBar,
  CreateBoardButton,
  SettingsButton,
  NotificationBell,
  UserProfile
} from './header/index';

const Header = ({ 
  onSearch, 
  onCreateBoard, 
  onSettings, 
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

        {/* Center - Search bar */}
        <SearchBar onSearch={onSearch} />

        {/* Right side - Actions */}
        <div className="flex items-center space-x-6">
          <CreateBoardButton onClick={onCreateBoard} />
          <SettingsButton onClick={onSettings} />
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