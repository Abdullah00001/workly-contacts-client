'use client';
import { useLabelModalStore } from '@/stores/label-modal-store';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';
import { RetrieveLabels } from '../services/label-services';
import { TLabel } from '../types/type';
import DashboardSidebarSingleLabel from './DashboardSidebarSingleLabel';

const DashboardSidebarLabel: FC = () => {
  const pathname = usePathname();
  const { toggleCreateLabelModal } = useLabelModalStore();
  const { data, isPending } = useQuery({
    queryKey: ['labels'],
    queryFn: RetrieveLabels,
  });
  return (
    <>
      <div className="flex justify-between items-center px-3.5 lg:px-4 mt-2">
        <div className="text-[#444746] font-bold text-sm font-google-sans-text">
          Label
        </div>
        <button
          onClick={() => toggleCreateLabelModal()}
          className="flex justify-center items-center w-[48px] h-[48px] hover:rounded-full hover:bg-[#E8EEF0] hover:cursor-pointer"
        >
          <Plus size={24} className="text-[#444746]" />
        </button>
      </div>
      {isPending ? null : (
        <div className="flex flex-col w-full">
          {(data as TLabel[]).map((label) => {
            const isActive = pathname === `/label/${label._id}`;
            return (
              <DashboardSidebarSingleLabel
                key={label._id}
                data={label}
                isActive={isActive}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default DashboardSidebarLabel;
