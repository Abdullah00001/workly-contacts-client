'use client';

import { FC } from 'react';

const ActivityRowSkeleton: FC = () => (
  <div className="flex items-center gap-4 p-4 bg-gray-500 rounded-lg border border-gray-200 animate-pulse">
    <div className="w-10 h-10 bg-gray-200 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
    <div className="w-20 h-3 bg-gray-200 rounded" />
  </div>
);

export default ActivityRowSkeleton;
