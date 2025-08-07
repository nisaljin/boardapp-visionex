'use client';

import { useEffect, useState } from 'react';
import useBoardStore from '../lib/store';

const HydrationWrapper = ({ children }) => {
  const { _hasHydrated, setHasHydrated } = useBoardStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHasHydrated(true);
  }, [setHasHydrated]);

  if (!isClient || !_hasHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default HydrationWrapper; 