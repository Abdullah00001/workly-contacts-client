'use client';

import { useState, type FC } from 'react';
import { TTrashTable } from '../types/type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/common/Icon';
import TrashTableRow from './TrashTableRow';

const TrashTable: FC<TTrashTable> = ({ trash }) => {
  const [selectedContacts, setSelectContact] = useState<string[]>([]);
  const handleSelectAll = () => {
    setSelectContact(trash.map(({ _id }) => _id as string));
  };

  const handleSelectNone = () => {
    setSelectContact([]);
  };
  console.log(trash);
  return (
    <div className="flex flex-col gap-2">
      {selectedContacts.length > 0 ? (
        <div
          className={`sticky top-0 h-[50px]  bg-white  flex items-center justify-between w-full border-b border-b-[#c4c7c5]`}
        >
          <div className={`pl-[9px] flex items-center justify-start`}>
            <button
              onClick={handleSelectNone}
              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#0b57d030]"
            >
              <Icon
                name={
                  selectedContacts.length === trash.length
                    ? 'check_box'
                    : 'indeterminate_check_box'
                }
                className={`text-[#0b57d0]`}
                size={24}
                type="icons"
                variant="filled"
              />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-center items-center w-7 h-7 rounded-full cursor-pointer hover:bg-[#0b57d030]">
                <Icon
                  name={'arrow_drop_down'}
                  className={`text-[#0b57d0]`}
                  size={25}
                  type="icons"
                  variant="filled"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[130px] ml-[70px] lg:ml-[110px] bg-white border border-gray-200  shadow-lg  px-0 rounded-none py-2">
                <DropdownMenuItem
                  onClick={handleSelectAll}
                  className="w-full text-left px-4 py-2 text-[16px] !text-[#1F1F1F] hover:!bg-gray-200 cursor-pointer rounded-none"
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSelectNone}
                  className="w-full  text-left px-4 py-2 text-[16px] !text-[#1F1F1F] hover:!bg-gray-200 cursor-pointer rounded-none"
                >
                  None
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center justify-start gap-1 text-[#0b57d0] font-medium font-google-sans-text text-sm">
              <span className="font-medium">{selectedContacts.length}</span>
              <span className="font-medium">selected</span>
            </div>
          </div>
          <div className={`flex items-center justify-end`}>
            <div className="block sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex items-center justify-center w-[45px] h-[45px] cursor-pointer rounded-full hover:bg-[#0b57d030]`}
                >
                  <Icon
                    name={'more_vert'}
                    variant="outlined"
                    className={`text-[#0b57d0]`}
                    type="icons"
                    size={20}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`w-[180px] mr-8 lg:mr-[50px] bg-white border border-gray-200  shadow-lg  px-0 rounded-none py-2`}
                >
                  <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none">
                    Delete forever
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none">
                    Recover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden sm:block">
              <div className="flex justify-end items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`hover:bg-[#0b57d030] h-10 p-3 text-[#0b57d0] font-google-sans-text text-sm font-medium rounded-[28px] cursor-pointer`}
                >
                  Delete forever
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`hover:bg-[#0b57d030] h-10 p-3 text-[#0b57d0] font-google-sans-text text-sm font-medium rounded-[28px] cursor-pointer`}
                >
                  Recover
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sticky top-0  h-[50px]  bg-white  flex items-center justify-start gap-2 w-full border-b border-b-[#c4c7c5]">
          <div className="flex-1 sm:flex-2 text-sm font-google-sans-text font-medium text-[#444746] pl-2">
            Name
          </div>
          <div className="flex-1 font-google-sans-text text-sm font-medium text-[#444746] hidden sm:block">
            Date deleted
          </div>
          <div className="flex-1 flex items-center justify-end"></div>
          <div className="flex-1 font-google-sans-text text-sm font-medium text-[#444746] block sm:hidden">
            Date deleted
          </div>
        </div>
      )}
      <div className="w-full pb-2">
        <div className="py-[10px] pl-[10px] w-full">
          <h1 className="text-xs font-medium font-google-sans-text text-[#444746]">
            trash
          </h1>
        </div>
        <div className="flex flex-col w-full gap-1 mt-2">
          {trash.map((contact) => (
            <TrashTableRow
              key={contact._id}
              selectedContacts={selectedContacts}
              setSelectContact={setSelectContact}
              trash={contact}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrashTable;
