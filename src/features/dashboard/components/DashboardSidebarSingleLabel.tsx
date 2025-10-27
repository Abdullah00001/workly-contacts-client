'use client';

import Icon from '@/components/common/Icon';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { TDashboardSidebarSingleLabel } from '../types/type';
import LabelUpdateModal from './LabelUpdateModal';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteLabel } from '../services/label-services';
import LabelDeleteModal from './LabelDeleteModal';
import { usePathname, useRouter } from 'next/navigation';

const DashboardSidebarSingleLabel: FC<TDashboardSidebarSingleLabel> = ({
  data,
  isActive,
}) => {
  const pathname = usePathname();
  const isCurrentPath = pathname === `/label/${data?._id}`;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [isChildHover, setIsChildHover] = useState<boolean>(false);
  const [hoveredLabelId, setHoveredLabelId] = useState<string | null>(null);
  const { labelName } = data;
  const handleMouseEnter = () => {
    if (!open) {
      setHoveredLabelId(data?._id);
    }
  };

  const handleMouseLeave = () => {
    if (!open) {
      setHoveredLabelId(null);
    }
  };
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: { _id: string; withContacts?: boolean }) =>
      await DeleteLabel(payload),
    onSuccess: (data) => {
      toast(`Label ${labelName} deleted`, {
        closeButton: false,
        position: 'bottom-center',
      });
      queryClient.invalidateQueries({ queryKey: ['labels'] });
      if (isCurrentPath) router.push('/dashboard');
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message, {
          closeButton: false,
          position: 'bottom-center',
        });
      toast.error('Unwanted error occurred,Try Again!');
    },
  });
  useEffect(() => {
    if (isPending) {
      toast(`Working...`, {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [isPending]);
  return (
    <Link
      href={`/label/${data?._id}`}
      key={data?._id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex-1 w-full cursor-pointer group flex items-center font-bold font-google-sans-text justify-between px-4 lg:px-4  rounded-full text-sm ${
        isActive
          ? `bg-[#c2e7ff] text-[#001D35] ${isChildHover ? '' : 'hover:bg-[#c2e7ff]'}`
          : `text-[#444746] ${isChildHover ? '' : 'hover:bg-gray-100'}`
      }`}
    >
      <div className="flex justify-start items-center cursor-pointer gap-2">
        <Icon
          name="label"
          className="text-[#444746]"
          size={24}
          type="icons"
          variant="filled"
        />
        <span className="overflow-hidden w-full">{data?.labelName}</span>
      </div>
      {hoveredLabelId !== data?._id ? (
        <div className="h-[44px] w-[44px] flex justify-center items-center">
          <span className="text-[12px] text-[#444746] text-center">
            {data?.contactCount}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-end">
          <button
            onMouseEnter={() => setIsChildHover(true)}
            onMouseLeave={() => setIsChildHover(false)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
              setHoveredLabelId(null);
            }}
            className={`w-[44px] h-[44px] cursor-pointer flex items-center justify-center ${isActive ? `hover:bg-blue-200` : `hover:!bg-gray-200 `} hover:rounded-full`}
          >
            <Icon
              name="edit"
              variant="outlined"
              className=" text-[#444746]"
              type="icons"
              size={24}
            />
          </button>
          <button
            onMouseEnter={() => setIsChildHover(true)}
            onMouseLeave={() => setIsChildHover(false)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (data?.contactCount > 0) {
                setOpenDelete(true);
                setHoveredLabelId(null);
                return;
              }
              mutate({ _id: data?._id, withContacts: false });
            }}
            className={`w-[44px] h-[44px] cursor-pointer flex items-center justify-center ${isActive ? `hover:bg-blue-200` : `hover:!bg-gray-200 `} hover:rounded-full`}
          >
            <Icon
              name="delete"
              variant="outlined"
              className=" text-[#444746]"
              type="symbols"
              size={24}
            />
          </button>
        </div>
      )}
      <LabelUpdateModal
        currentLabelName={data?.labelName}
        _id={data?._id}
        open={open}
        setOpen={setOpen}
      />
      <LabelDeleteModal
        _id={data?._id}
        mutate={mutate}
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </Link>
  );
};

export default DashboardSidebarSingleLabel;
