'use client';
import { FC } from 'react';
import ActivityRowSkeleton from './ActivityRowSkeleton';

const ActivityTableSkeleton: FC = () => (
  <div className="flex flex-1 flex-col gap-5 px-4 lg:px-0 pb-4">
    {[1, 2].map((section) => (
      <div key={section}>
        <div className="h-6 bg-gray-400 rounded w-32 mb-6 animate-pulse" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((row) => (
            <ActivityRowSkeleton key={row} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ActivityTableSkeleton;
