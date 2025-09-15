'use client';
import Icon from '@/components/common/Icon';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

const DashboardSidebarLabel: FC = () => {
  const pathname = usePathname();
  const labels = [
    {
      objectId: '650f6a9d8c7a5b1234567890',
      name: 'Beginner',
    },
    {
      objectId: '650f6a9d8c7a5b1234567891',
      name: 'Intermediate',
    },
    {
      objectId: '650f6a9d8c7a5b1234567892',
      name: 'Advanced',
    },
    {
      objectId: '650f6a9d8c7a5b1234567893',
      name: 'Expert',
    },
    {
      objectId: '650f6a9d8c7a5b1234567894',
      name: 'Master',
    },
    {
      objectId: '650f6a9d8c7a5b1234567895',
      name: 'Legend',
    },
    {
      objectId: '650f6a9d8c7a5b1234567896',
      name: 'Elite',
    },
    {
      objectId: '650f6a9d8c7a5b1234567897',
      name: 'Pro',
    },
    {
      objectId: '650f6a9d8c7a5b1234567898',
      name: 'Champion',
    },
    {
      objectId: '650f6a9d8c7a5b1234567899',
      name: 'Grandmaster',
    },
    {
      objectId: '650f6a9d8c7a5b1234567900',
      name: 'Novice',
    },
    {
      objectId: '650f6a9d8c7a5b1234567901',
      name: 'Skilled',
    },
    {
      objectId: '650f6a9d8c7a5b1234567902',
      name: 'Specialist',
    },
    {
      objectId: '650f6a9d8c7a5b1234567903',
      name: 'Veteran',
    },
    {
      objectId: '650f6a9d8c7a5b1234567904',
      name: 'Ace',
    },
    {
      objectId: '650f6a9d8c7a5b1234567905',
      name: 'Hero',
    },
    {
      objectId: '650f6a9d8c7a5b1234567906',
      name: 'Mythic',
    },
    {
      objectId: '650f6a9d8c7a5b1234567907',
      name: 'Supreme',
    },
    {
      objectId: '650f6a9d8c7a5b1234537919',
      name: 'Supremeeee',
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-3.5 lg:px-4 mt-2">
        <div className="text-[#444746] font-bold text-sm font-google-sans-text">
          Label
        </div>
        <div className="flex justify-center items-center w-[48px] h-[48px] hover:rounded-full hover:bg-[#E8EEF0] hover:cursor-pointer">
          <Plus size={24} className="text-[#444746]" />
        </div>
      </div>
      <div className="flex flex-col w-full">
        {labels.map(({ name, objectId }) => {
          const isActive = pathname === `/label/${objectId}`;
          return (
            <Link
              key={objectId}
              href={`/label/${objectId}`}
              className={`flex-1 flex items-center font-bold font-google-sans-text justify-between px-4 lg:px-4  rounded-full text-sm ${
                isActive
                  ? 'bg-blue-100 text-[#001D35]'
                  : 'text-[#444746] hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  name="label"
                  className="text-[#444746]"
                  size={24}
                  type="icons"
                  variant="filled"
                />
                <span className="overflow-hidden w-full">{name}</span>
              </div>
              <div className="flex items-center justify-end">
                <div className="w-[44px] h-[44px] flex items-center justify-center hover:!rounded-full">
                  <Icon
                    name="edit"
                    variant="outlined"
                    className=" text-[#444746]"
                    type="icons"
                    size={24}
                  />
                </div>
                <div className="w-[44px] h-[44px] flex items-center justify-center hover:rounded-full">
                  <Icon
                    name="delete"
                    variant="outlined"
                    className=" text-[#444746]"
                    type="symbols"
                    size={24}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DashboardSidebarLabel;
