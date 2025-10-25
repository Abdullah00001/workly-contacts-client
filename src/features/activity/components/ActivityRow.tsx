'use client';
import { ChevronRight } from 'lucide-react';
import { FC } from 'react';
import { TActivity } from '../types/activity-type';
import { useRouter } from 'next/navigation';
import { formatActivityTime } from '../lib/activity-lib';

const ActivityRow: FC<TActivity> = ({
  _id,
  createdAt,
  device,
  location,
  title,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/activity/${_id}`)}
      className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-100/20 cursor-pointer"
    >
      <div className="flex items-center justify-">
        <div className="flex-1">
          <div className="flex items-center justify-start">
            <span className="font-google-sans text-sm">
              {formatActivityTime(createdAt)}
            </span>
          </div>
        </div>
        <div className="flex-2">
          <div className="flex flex-col gap-1 md:gap-0 md:flex-row md:justify-between md:items-center">
            <div className="text-sm">{title}</div>
            <div className="text-sm flex flex-col">
              <span>{location}</span>
              <span>{device}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end w-[24px]">
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};

export default ActivityRow;
