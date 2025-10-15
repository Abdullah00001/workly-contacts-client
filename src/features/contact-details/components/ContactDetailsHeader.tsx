'use client';

import { useEffect, useState, type FC } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import {
  TContactDetailInfoHeader,
  TContactDetails,
  TToggleFavoriteStatus,
} from '../types/type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { ToggleFavoriteStatus } from '../service/contact-detail-service';
import TrashModal from '@/features/dashboard/components/TrashModal';

const ContactDetailsHeader: FC<TContactDetailInfoHeader> = ({
  setIsEdit,
  details,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();
  const { mutate: favoriteToggle, isPending: favoriteTogglePending } =
    useMutation({
      mutationFn: async (payload: TToggleFavoriteStatus) =>
        await ToggleFavoriteStatus(payload),
      onSuccess: (data: TContactDetails) => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.setQueryData(
          ['contacts', details?._id],
          (oldData: AxiosResponse) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              isFavorite: data,
            };
          }
        );
        if (data?.isFavorite === false)
          toast(`${data?.firstName} ${data?.lastName} removed from contact`, {
            closeButton: false,
            position: 'bottom-center',
          });
        if (data?.isFavorite === true)
          toast(`Added ${data?.firstName} ${data?.lastName} to favorites`, {
            closeButton: false,
            position: 'bottom-center',
          });
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
  const handleFavoriteToggle = () => {
    favoriteToggle({
      id: details?._id,
      payload: { isFavorite: !details?.isFavorite },
    });
  };
  const loading = favoriteTogglePending;
  useEffect(() => {
    if (loading) {
      toast('Working...', { closeButton: false, position: 'bottom-center' });
    }
  }, [loading]);
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 769);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return (
    <div className="flex xl:max-w-[1032px] justify-between items-center px-2 pt-2 contact-details-header-padding">
      <div
        onClick={() => router.back()}
        className="w-12 h-12 flex justify-center items-center"
      >
        <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
          <Icon
            name="arrow_back"
            size={24}
            variant="outlined"
            type="icons"
            className="text-[#444746]"
          />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div
          onClick={handleFavoriteToggle}
          className="w-12 h-12 flex justify-center items-center"
        >
          {details?.isFavorite ? (
            <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#0b57d016] transition-colors flex items-center justify-center">
              <Icon
                name="star"
                size={22}
                variant="filled"
                type="icons"
                className="text-[#0b57d0]"
              />
            </div>
          ) : (
            <div
              onClick={handleFavoriteToggle}
              className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center"
            >
              <Icon
                name="star_border"
                size={22}
                variant="outlined"
                type="icons"
                className="text-[#444746]"
              />
            </div>
          )}
        </div>
        {isMobile ? (
          <div className="w-12 h-12 flex justify-center items-center">
            <div
              onClick={() => setIsEdit(true)}
              className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center"
            >
              <Icon
                name="edit"
                size={22}
                variant="outlined"
                type="symbols"
                className="text-[#444746]"
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="h-10 cursor-pointer text-white bg-[#0b57d0] rounded-[24px] px-6 font-medium font-google-sans-text"
          >
            Edit
          </button>
        )}
        <div className="w-12 h-12 flex justify-center items-center">
          <div
            onClick={() => {
              setOpen(true);
            }}
            className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center"
          >
            <Icon
              name="delete"
              size={22}
              variant="outlined"
              type="symbols"
              className="text-[#444746]"
            />
          </div>
        </div>
        <div className="w-12 h-12 flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
              <Icon
                name="more_vert"
                size={22}
                variant="outlined"
                type="icons"
                className="text-[#444746]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`absolute right-0 w-[180px] mr-2 lg:mr-[10px] bg-white border border-gray-200  shadow-lg  px-0 rounded-[8px] py-2`}
            >
              <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none">
                <Icon
                  name="print"
                  variant="filled"
                  className="text-[#444746]"
                  size={22}
                  type="icons"
                />
                Print
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none">
                <Icon
                  name="file_upload"
                  variant="outlined"
                  className=" text-[#444746]"
                  size={22}
                  type="icons"
                />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TrashModal isDetailPage={true} open={open} setOpen={setOpen} singleId={details?._id} />
    </div>
  );
};

export default ContactDetailsHeader;
