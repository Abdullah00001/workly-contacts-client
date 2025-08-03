import { FC } from 'react';

const SkeletonLine = ({ width = 'w-full' }: { width?: string }) => (
  <div className={`h-4 bg-gray-300 rounded ${width} animate-pulse`} />
);

const SecurityPageSkeleton: FC = () => {
  return (
    <div className="space-y-6 px-4 py-6">
      {/* Security Overview Card */}
      <div className="bg-white/5 rounded-2xl shadow p-6 space-y-4 w-full">
        <SkeletonLine width="w-1/4" /> {/* Security Overview title */}
        <div className="space-y-3">
          <SkeletonLine width="w-3/4" />
          <SkeletonLine width="w-3/4" />
          <SkeletonLine width="w-3/4" />
          <SkeletonLine width="w-3/4" />
          <SkeletonLine width="w-3/4" />
        </div>
      </div>

      {/* Active Sessions Card */}
      <div className="bg-white/5 rounded-2xl shadow p-6 space-y-4 w-full">
        <SkeletonLine width="w-1/4" /> {/* Active Sessions title */}
        <div className="space-y-2">
          <div className="flex space-x-4">
            <SkeletonLine width="w-1/5" />
            <SkeletonLine width="w-1/5" />
            <SkeletonLine width="w-1/5" />
            <SkeletonLine width="w-1/5" />
          </div>
          <SkeletonLine width="w-full" />
        </div>
      </div>

      {/* Recent Security Activity Card */}
      <div className="bg-white/5 rounded-2xl shadow p-6 space-y-4 w-full">
        <SkeletonLine width="w-1/4" /> {/* Recent Security Activity title */}
        <div className="space-y-3">
          <SkeletonLine width="w-3/4" />
          <SkeletonLine width="w-3/4" />
          <SkeletonLine width="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default SecurityPageSkeleton;
