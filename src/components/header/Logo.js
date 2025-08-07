import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 relative">
        {/* Logo icon - simplified version */}
        <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-sm"></div>
        </div>
      </div>
      <span className="text-lg font-semibold text-gray-800">Board App</span>
    </div>
  );
};

export default Logo; 