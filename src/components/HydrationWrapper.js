'use client';

import { useEffect, useState } from 'react';
import useTaskStore from '@/lib/store';

export default function HydrationWrapper({ children }) {
  const { _hasHydrated } = useTaskStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state until hydration is complete
  if (!isClient || !_hasHydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return children;
} 