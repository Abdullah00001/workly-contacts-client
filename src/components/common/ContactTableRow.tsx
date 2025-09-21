'use client';
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
  type FC,
} from 'react';
import { TContacts } from '@/components/common/ContactTable';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';
import MoreActionModal from '@/components/common/MoreActionModal';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const { avatar, email, name, objectId, phone } = contact;
  const isSelected = selectedContacts.includes(objectId);
  const [isChildHover, setIsChildHover] = useState<boolean>(false);
  const [isRowHover, setIsRowHover] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isMoreActionOpen, setIsMoreActionOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSelect = (e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
    e.stopPropagation();
    setSelectContact((prev) =>
      isSelected
        ? prev.filter((contactId) => contactId !== objectId)
        : [...prev, objectId]
    );
  };
  const handleMoreActionsClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMoreActionOpen(!isMoreActionOpen);
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

  return (
    <div
      onMouseEnter={onRowMouseEnter}
      onMouseLeave={onRowMouseLeave}
      onClick={() => router.push(`/person/${objectId}`)}
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
                  avatar
                    ? avatar
                    : `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
                }
                alt="Avatar"
                className="w-9 h-9 cursor-pointer rounded-full"
              />
            </div>
          )}
        </div>
        <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal">
          {name}
        </div>
      </div>
      <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden sm:block">
        {email}
      </div>
      <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden phone-field-md phone-field-lg">
        {phone}
      </div>
      <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden job-field-lg"></div>
      <div className="flex-1 text-[#1F1F1F] text-sm font-google-sans-text font-normal hidden address-field-lg"></div>
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
              setIsFavorite((prev) => !prev);
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
              router.push(`/person/${objectId}?edit=1`);
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
          <DropdownMenu
            open={isMoreActionOpen}
            onOpenChange={setIsMoreActionOpen}
          >
            <DropdownMenuTrigger
              onClick={handleMoreActionsClick}
              className={`${isSelected ? 'hover:bg-[#0b57d030]' : 'hover:bg-gray-200'} w-[40px] h-[40px] flex items-center justify-center  cursor-pointer rounded-full `}
            >
              <Icon
                name={'more_vert'}
                variant="outlined"
                className=" text-[#444746]"
                type="icons"
                size={20}
              />
            </DropdownMenuTrigger>
            <MoreActionModal />
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ContactTableRow;
