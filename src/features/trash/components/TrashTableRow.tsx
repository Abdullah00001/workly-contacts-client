'use client';

import { ChangeEvent, useState, MouseEvent, type FC, useEffect } from 'react';
import { TTrashTableRow } from '../types/type';
import { formatTrashAtDate } from '@/lib/date-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecoverOneTrashItem } from '../services/trash-service';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const TrashTableRow: FC<TTrashTableRow> = ({
  selectedContacts,
  setSelectContact,
  trash,
}) => {
  const queryClient = useQueryClient();
  const { _id, avatar, firstName, isTrashed, lastName, trashedAt } = trash;
  const isSelected = selectedContacts.includes(_id);
  const [isChildHover, setIsChildHover] = useState<boolean>(false);
  const [isRowHover, setIsRowHover] = useState<boolean>(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: string) => await RecoverOneTrashItem(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['labels'] });
      toast('1 contact recovered', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
          closeButton: false,
          position: 'bottom-center',
        });
      }
      toast.error('Empty One Trash Operation failed,Try Again!', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
  });
  const handleSelect = (e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
    e.stopPropagation();
    setSelectContact((prev) =>
      isSelected
        ? prev.filter((contactId) => contactId !== _id)
        : [...prev, _id]
    );
  };
  const onRowMouseEnter = () => {
    setIsRowHover(true);
  };

  const onRowMouseLeave = () => {
    setIsRowHover(false);
  };

  const onChildMouseEnter = () => {
    setIsChildHover(true);
  };

  const onChildMouseLeave = () => {
    setIsChildHover(false);
  };
  useEffect(() => {
    if (isPending) {
      toast('Working...', {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [isPending]);
  return (
    <div
      onMouseEnter={onRowMouseEnter}
      onMouseLeave={onRowMouseLeave}
      className={`flex rounded-sm px-2 py-[5px] gap-2 items-center justify-start ${
        isSelected && 'bg-[#d3e3fd] hover:bg-[#0b57d035]'
      } ${isChildHover ? '' : 'hover:bg-[#0b57d014]'} cursor-pointer`}
    >
      <div className="flex-2 flex gap-5 items-center justify-start">
        <div className="w-10 h-10 flex-shrink-0">
          {isSelected ? (
            <div
              onMouseEnter={onChildMouseEnter}
              onMouseLeave={onChildMouseLeave}
              onClick={(e) => e.stopPropagation()}
              className={`w-full h-full flex items-center justify-center rounded-full hover:bg-[#0b57d030]`}
            >
              <input
                onChange={handleSelect}
                checked={isSelected}
                type="checkbox"
                className="cursor-pointer w-4.5 h-4.5"
              />
            </div>
          ) : isRowHover ? (
            <div
              onMouseEnter={onChildMouseEnter}
              onMouseLeave={onChildMouseLeave}
              onClick={(e) => e.stopPropagation()}
              className={`w-full h-full flex items-center justify-center rounded-full hover:bg-gray-200`}
            >
              <input
                onChange={handleSelect}
                checked={isSelected}
                type="checkbox"
                className="cursor-pointer w-4.5 h-4.5"
              />
            </div>
          ) : (
            <div
              onClick={handleSelect}
              className={`flex items-center justify-center`}
            >
              <img
                src={
                  avatar.url
                    ? avatar.url
                    : `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}`
                }
                alt="Avatar"
                className="w-9 h-9 cursor-pointer rounded-full"
              />
            </div>
          )}
        </div>
        <div className="text-[#1F1F1F] flex-1 text-sm font-google-sans-text font-normal text-wrap">
          {firstName} {lastName}
        </div>
      </div>
      <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden sm:block">
        {formatTrashAtDate(trashedAt)}
      </div>
      <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal sm:hidden block">
        {formatTrashAtDate(trashedAt)}
      </div>
      <div className="flex-1 w-[170px] hidden sm:block">
        <div
          className={`flex items-center justify-end ${
            isRowHover ? 'visible' : 'lg:invisible'
          }`}
        >
          <button
            onMouseEnter={onChildMouseEnter}
            onMouseLeave={onChildMouseLeave}
            onClick={(e) => {
              e.stopPropagation();
              mutate(trash._id);
            }}
            className={`${isSelected ? 'hover:bg-[#0b57d030]' : 'hover:bg-gray-200'} h-10 p-3 text-[#0b57d0] font-google-sans-text text-sm font-medium rounded-[28px] cursor-pointer`}
          >
            Recover
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashTableRow;
