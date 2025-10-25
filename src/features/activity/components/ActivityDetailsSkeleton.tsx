'use client';
import { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ActivityDetailsSkeleton: FC = () => {
  return (
    <>
      {/* Main Activity Card Skeleton */}
      <Card className="mb-4 sm:mb-6 bg-[#1a2930] border-gray-800 animate-pulse">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-4 w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-lg shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-6 sm:h-7 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-700 rounded w-1/2" />
              </div>
            </div>
            <div className="w-24 sm:w-32 h-6 bg-gray-700 rounded-full shrink-0" />
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="flex items-start gap-3 p-3 sm:p-4 bg-[#0f1a1f] rounded-lg border border-gray-800">
            <div className="w-5 h-5 bg-gray-700 rounded shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device & Location Information Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card className="bg-[#1a2930] border-gray-800 animate-pulse">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-700 rounded" />
              <div className="h-5 bg-gray-700 rounded w-40" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-gray-700 rounded w-24" />
              <div className="h-4 bg-gray-700 rounded w-20" />
            </div>
            <Separator className="bg-gray-800" />
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-gray-700 rounded w-20" />
              <div className="h-4 bg-gray-700 rounded w-24" />
            </div>
            <Separator className="bg-gray-800" />
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-gray-700 rounded w-32" />
              <div className="h-4 bg-gray-700 rounded w-28" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a2930] border-gray-800 animate-pulse">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-700 rounded" />
              <div className="h-5 bg-gray-700 rounded w-44" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-gray-700 rounded w-20" />
              <div className="h-4 bg-gray-700 rounded w-32" />
            </div>
            <Separator className="bg-gray-800" />
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-gray-700 rounded w-24" />
              <div className="h-4 bg-gray-700 rounded w-28" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timestamp Information Skeleton */}
      <Card className="bg-[#1a2930] border-gray-800 animate-pulse">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-700 rounded" />
            <div className="h-5 bg-gray-700 rounded w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <div>
            <div className="h-4 bg-gray-700 rounded w-32 mb-2" />
            <div className="h-4 bg-gray-700 rounded w-48" />
          </div>
          <Separator className="bg-gray-800" />
          <div>
            <div className="h-4 bg-gray-700 rounded w-28 mb-2" />
            <div className="h-4 bg-gray-700 rounded w-48" />
          </div>
        </CardContent>
      </Card>

      {/* Security Notice Skeleton */}
      <Card className="mt-4 sm:mt-6 border-amber-800 bg-amber-950/30 animate-pulse">
        <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
          <div className="flex gap-3">
            <div className="w-5 h-5 bg-amber-800 rounded shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-amber-800 rounded w-40" />
              <div className="h-4 bg-amber-800 rounded w-full" />
              <div className="h-4 bg-amber-800 rounded w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ActivityDetailsSkeleton;
