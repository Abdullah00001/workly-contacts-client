import { FC } from 'react';

const SkeletonLine = ({ width = 'w-full' }: { width?: string }) => (
  <div className={`h-4 bg-gray-300 rounded ${width} animate-pulse`} />
);

const BasicInfoSkeleton: FC = () => {
  return (
    <div className="space-y-6 px-4 py-6">
      {/* First Card */}
      <div className="bg-white/5 rounded-2xl shadow p-6 space-y-4 w-full">
        <SkeletonLine width="w-1/4" /> {/* Basic Info title */}
        <div className="flex items-center justify-between">
          <div>
            <SkeletonLine width="w-32" />
            <SkeletonLine width="w-56 mt-1" />
          </div>
          <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse" />
        </div>
        <div className="space-y-4">
          {['Name', 'Date Of Birth', 'Gender'].map((idx) => (
            <div key={idx} className="flex justify-between items-center">
              <SkeletonLine width="w-24" />
              <SkeletonLine width="w-40" />
            </div>
          ))}
        </div>
      </div>

      {/* Second Card */}
      <div className="bg-white/5 rounded-2xl shadow p-6 space-y-4 w-full">
        <SkeletonLine width="w-1/4" /> {/* Basic Info title */}
        <div className="space-y-4">
          {['Email', 'Phone'].map((idx) => (
            <div key={idx} className="flex justify-between items-center">
              <SkeletonLine width="w-24" />
              <SkeletonLine width="w-48" />
            </div>
          ))}
        </div>
      </div>
      {/* Second Card */}
      <div className="bg-white/5 rounded-2xl shadow p-6 space-y-4 w-full">
        <SkeletonLine width="w-1/4" /> {/* Basic Info title */}
        <div className="space-y-4">
          {['Email', 'Phone'].map((idx) => (
            <div key={idx} className="flex justify-between items-center">
              <SkeletonLine width="w-24" />
              <SkeletonLine width="w-48" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSkeleton;
