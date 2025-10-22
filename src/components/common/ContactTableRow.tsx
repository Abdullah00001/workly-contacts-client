'use client';
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  startTransition,
  useEffect,
  useState,
  type FC,
} from 'react';
import { TContacts } from '@/components/common/ContactTable';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  TContactDetails,
  TToggleFavoriteStatus,
} from '@/features/contact-details/types/type';
import { ToggleFavoriteStatus } from '@/features/contact-details/service/contact-detail-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MoreActionDropDown from './MoreActionDropdown';

type TContactTableRow = {
  contact: TContacts;
  selectedContacts: string[];
  setSelectContact: Dispatch<SetStateAction<string[]>>;
};

const ContactTableRow: FC<TContactTableRow> = ({
  contact,
  selectedContacts,
  setSelectContact,
}) => {
  const queryClient = useQueryClient();
  const {
    _id,
    avatar,
    email,
    firstName,
    isFavorite,
    isTrashed,
    lastName,
    phone,
    location,
    worksAt,
  } = contact as TContacts;
  const isSelected = selectedContacts.includes(_id);
  const [isChildHover, setIsChildHover] = useState<boolean>(false);
  const [isRowHover, setIsRowHover] = useState<boolean>(false);
  const [isMoreActionOpen, setIsMoreActionOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSelect = (e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
    e.stopPropagation();
    setSelectContact((prev) =>
      isSelected
        ? prev.filter((contactId) => contactId !== _id)
        : [...prev, _id]
    );
  };
  const handleMoreActionsClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMoreActionOpen(true);
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
  const { mutate: favoriteToggle, isPending: favoriteTogglePending } =
    useMutation({
      mutationFn: async (payload: TToggleFavoriteStatus) =>
        await ToggleFavoriteStatus(payload),
      onSuccess: (data: TContactDetails) => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.setQueryData(['favorites'], data);
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
  const handleToggleFavorite = () => {
    favoriteToggle({ id: _id, payload: { isFavorite: !isFavorite } });
  };
  const loading = favoriteTogglePending;
  useEffect(() => {
    if (loading) {
      toast(`Working...`, {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [loading]);
  return (
    <>
      <div
        onMouseEnter={onRowMouseEnter}
        onMouseLeave={onRowMouseLeave}
        onClick={() => router.push(`/person/${_id}`)}
        className={`flex rounded-sm px-2 py-[5px] gap-2 items-center justify-start ${
          isSelected && 'bg-[#d3e3fd] hover:bg-[#0b57d035]'
        } ${isChildHover ? '' : 'hover:bg-[#0b57d014]'} cursor-pointer`}
      >
        <div className="flex-1 flex gap-5 items-center justify-start">
          <div className="w-10 h-10">
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
          <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal">
            {firstName} {lastName}
          </div>
        </div>
        <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden sm:block">
          {email}
        </div>
        <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden phone-field-md phone-field-lg">
          {phone.number}
        </div>
        <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden job-field-lg overflow-hidden">
          {worksAt?.jobTitle &&
            ((worksAt?.jobTitle).length > 17
              ? worksAt.jobTitle.slice(0, 16) + '...'
              : worksAt.jobTitle)}
        </div>
        <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden address-field-lg">
          {location?.streetAddress &&
            ((location?.streetAddress).length > 17
              ? location.streetAddress.slice(0, 16) + '...'
              : location.streetAddress)}
        </div>
        <div className="flex-1 w-[170px] hidden sm:block">
          <div
            className={`flex items-center justify-end ${
              isMoreActionOpen
                ? 'visible'
                : isRowHover
                  ? 'visible'
                  : 'lg:invisible'
            }`}
          >
            <button
              onMouseEnter={onChildMouseEnter}
              onMouseLeave={onChildMouseLeave}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite();
              }}
              className={`${isSelected ? 'hover:bg-[#0b57d030]' : 'hover:bg-gray-200'} w-[40px] h-[40px] flex items-center justify-center  cursor-pointer rounded-full `}
            >
              {isFavorite ? (
                <Icon
                  name={'star'}
                  variant="filled"
                  className=" text-[#0b57d0]"
                  type="icons"
                  size={20}
                />
              ) : (
                <Icon
                  name={'star_outline'}
                  variant="outlined"
                  className=" text-[#444746]"
                  type="icons"
                  size={20}
                />
              )}
            </button>
            <button
              onMouseEnter={onChildMouseEnter}
              onMouseLeave={onChildMouseLeave}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/person/${_id}?edit=1`);
              }}
              className={`${isSelected ? 'hover:bg-[#0b57d030]' : 'hover:bg-gray-200'} w-[40px] h-[40px] flex items-center justify-center  cursor-pointer rounded-full `}
            >
              <Icon
                name={'edit'}
                variant="outlined"
                className=" text-[#444746]"
                type="icons"
                size={20}
              />
            </button>
            <MoreActionDropDown
              setSelectContact={setSelectContact}
              isMoreActionOpen={isMoreActionOpen}
              setIsMoreActionOpen={setIsMoreActionOpen}
              handleMoreActionsClick={handleMoreActionsClick}
              contact={contact}
              isSelected={isSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactTableRow;
