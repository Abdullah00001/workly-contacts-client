'use client';

import { useState, type FC } from 'react';
import Icon from '@/components/common/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TrashModal from '@/features/dashboard/components/TrashModal';
import { TMoreActionDropDown } from '@/features/dashboard/types/type';

const MoreActionDropDown: FC<TMoreActionDropDown> = ({
  contact,
  isSelected,
  handleMoreActionsClick,
  isMoreActionOpen,
  setIsMoreActionOpen,
  setSelectContact,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { _id } = contact;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <DropdownMenu open={isMoreActionOpen} onOpenChange={setIsMoreActionOpen}>
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
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          className="hidden sm:block w-[270px] mr-[46px] lg:mr-[72px] bg-white border border-gray-200  shadow-lg z-50 px-0 rounded-none py-2"
        >
          <div className="pb-2 border-b">
            <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer">
              <Icon
                name="print"
                variant="filled"
                className="text-[#444746]"
                size={22}
                type="icons"
              />
              Print
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer">
              <Icon
                name="file_upload"
                variant="outlined"
                className=" text-[#444746]"
                size={22}
                type="icons"
              />
              Export
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpen(true);
                setIsMoreActionOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer"
            >
              <Icon
                name="delete"
                variant="outlined"
                className=" text-[#444746]"
                size={22}
                type="symbols"
              />
              Delete
            </DropdownMenuItem>
          </div>
          <div className="pt-2 w-full">
            <h5 className="px-4 w-full text-[#747776] text-xs font-google-sans-text">
              Change Labels
            </h5>
            <div className="mt-1 max-h-[220px] w-full overflow-auto">
              {[
                'hello',
                'hi',
                'bye',
                'go',
                'next',
                'nest',
                'django',
                'node',
                'express',
              ].map((item) => (
                <DropdownMenuItem
                  key={item}
                  className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer"
                >
                  <Icon
                    name="label"
                    variant="outlined"
                    className=" text-[#444746]"
                    size={22}
                    type="symbols"
                  />
                  {item}
                </DropdownMenuItem>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <TrashModal
        setSelectContact={setSelectContact}
        open={open}
        setOpen={setOpen}
        singleId={_id}
      />
    </div>
  );
};

export default MoreActionDropDown;
