'use client';

import { ChevronRight } from 'lucide-react';
import { FC } from 'react';
import { TRecentActivitySectionProps } from '../types/personal-info-types';
import { getMonthAndDayFromISO } from '@/lib/date-utils';

const RecentSecurityActivity: FC<TRecentActivitySectionProps> = ({activities}) => {
  return (
    <div className="w-full mt-4 mb-10 border border-gray-500 lg:px-4 lg:pt-6 lg:pb-4 p-4 rounded-[8px]">
      <h5 className="font-medium text-[16px]">Recent Security Activity</h5>
      <div className="mt-2">
        {activities
          .map(({ activityType,createdAt,_id,location },index) => (
            <div key={_id}>
              <div
                className={`flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 lg:border-b lg:border-gray-400 items-center justify-between w-full`}
              >
                <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
                  <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]  whitespace-nowrap">
                    {activityType}
                  </h5>
                  <h6 className="text-xs font-medium min-[620px]:w-[50%]">
                    {getMonthAndDayFromISO(createdAt)},{location}
                  </h6>
                </div>
                <div className="flex justify-end min-[620px]:w-[40%]">
                  <ChevronRight
                    size={25}
                    className="transition-transform duration-200 hover:translate-x-1 text-gray-400"
                  />
                </div>
              </div>
              <hr className="lg:hidden mt-3 mb-3 text-gray-400" />
            </div>
          ))}
      </div>
      <div className="mt-4">
        <button className="font-bold text-[#0064e0] cursor-pointer">
          More Activity
        </button>
      </div>
    </div>
  );
};

export default RecentSecurityActivity;
