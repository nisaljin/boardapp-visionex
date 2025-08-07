import React from 'react';
import MenuItem from './MenuItem';

const GlobalMenu = () => {
  const globalMenuItems = [
    {
      icon: '/assets/icons/Info Circle.png',
      text: 'Support',
      isActive: false
    },
    {
      icon: '/assets/icons/Sign Out.png',
      text: 'Logout',
      isActive: true
    }
  ];

  return (
    <div className="space-y-3">
      {globalMenuItems.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          text={item.text}
          isActive={item.isActive}
        />
      ))}
    </div>
  );
};

export default GlobalMenu; 