import React from 'react';
import MenuItem from './MenuItem';
import BoardDropdown from './BoardDropdown';

const MainMenu = () => {
  const menuItems = [
    {
      icon: '/assets/icons/Grid.png',
      text: 'Dashboard',
      isActive: false
    },
    {
      icon: '/assets/icons/Message.png',
      text: 'Messages',
      isActive: false,
      hasNotification: true,
      notificationCount: 3
    },
    {
      icon: '/assets/icons/Calendar.png',
      text: 'Calendar',
      isActive: false
    },
    {
      icon: '/assets/icons/User.png',
      text: 'Team members',
      isActive: false
    }
  ];

  return (
    <div className="space-y-3">
      {/* Dashboard */}
      <MenuItem
        icon={menuItems[0].icon}
        text={menuItems[0].text}
        isActive={menuItems[0].isActive}
      />
      
      {/* Boards Dropdown */}
      <BoardDropdown />
      
      {/* Other Menu Items */}
      {menuItems.slice(1).map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          text={item.text}
          isActive={item.isActive}
          hasNotification={item.hasNotification}
          notificationCount={item.notificationCount}
        />
      ))}
    </div>
  );
};

export default MainMenu; 