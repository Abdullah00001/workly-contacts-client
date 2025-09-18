'use client';
import { useEffect, useRef, useState, type FC } from 'react';
import { TContacts } from '@/components/common/ContactTable';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';
import MoreActionModal from '@/components/common/MoreActionModal';

type TContactTableRow = {
  contact: TContacts;
};

const ContactTableRow: FC<TContactTableRow> = ({ contact }) => {
  const { avatar, email, name, objectId, phone } = contact;
  const [isChildHover, setIsChildHover] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isMoreActionOpen, setIsMoreActionOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreActionOpen(false);
      }
    };

    if (isMoreActionOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMoreActionOpen]);

  const handleMoreActionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMoreActionOpen(!isMoreActionOpen);
  };
  return (
    <div
      onClick={() => router.push(`/person/${objectId}`)}
      className={`group flex rounded-sm px-2 py-[5px] gap-2 items-center justify-start ${isChildHover ? '' : 'hover:bg-[#0b57d014]'} cursor-pointer`}
    >
      <div className="flex-1 flex gap-5 items-center justify-start">
        <div className="w-10 h-10">
          <div
            onMouseEnter={() => setIsChildHover(true)}
            onMouseLeave={() => setIsChildHover(false)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full hidden group-hover:flex items-center justify-center hover:rounded-full hover:bg-gray-200"
          >
            <input
              onClick={(e) => e.stopPropagation()}
              type="checkbox"
              className="cursor-pointer w-4.5 h-4.5"
            />
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="group-hover:hidden flex items-center justify-center"
          >
            {avatar ? (
              <img
                onClick={(e) => e.stopPropagation()}
                src={avatar}
                alt="Avatar"
                className="w-9 h-9 cursor-pointer rounded-full"
              />
            ) : (
              <img
                onClick={(e) => e.stopPropagation()}
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                alt="Avatar"
                className="w-9 h-9 cursor-pointer rounded-full"
              />
            )}
          </div>
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
          className={`flex item-center justify-end lg:invisible lg:group-hover:visible`}
        >
          <button
            onMouseEnter={() => setIsChildHover(true)}
            onMouseLeave={() => setIsChildHover(false)}
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite((prev) => !prev);
            }}
            className="w-[40px] h-[40px] flex items-center justify-center hover:!bg-gray-200 cursor-pointer rounded-full"
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
            onMouseEnter={() => setIsChildHover(true)}
            onMouseLeave={() => setIsChildHover(false)}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/person/${objectId}`);
            }}
            className="w-[40px] h-[40px] flex items-center justify-center hover:!bg-gray-200 cursor-pointer rounded-full"
          >
            <Icon
              name={'edit'}
              variant="outlined"
              className=" text-[#444746]"
              type="icons"
              size={20}
            />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              onMouseEnter={() => setIsChildHover(true)}
              onMouseLeave={() => setIsChildHover(false)}
              onClick={handleMoreActionsClick}
              className="w-[40px] h-[40px] flex items-center justify-center hover:!bg-gray-200 cursor-pointer rounded-full"
            >
              <Icon
                name={'more_vert'}
                variant="outlined"
                className=" text-[#444746]"
                type="icons"
                size={20}
              />
            </button>
            {isMoreActionOpen && <MoreActionModal />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTableRow;
