'use client';

import { ChangeEvent, useState, type FC } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TExportType = 'csv' | 'vcard' | 'json';

const ExportModal: FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<TExportType>('csv');
  const selectFormat = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFormat(e.target.value as TExportType);
  };
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white rounded-[18px] w-[348px] px-6 py-5 shadow-lg ">
        <h2 className="text-[1.5rem] font-normal font-google-sans text-[#1f1f1f]">
          Export contacts
        </h2>
        <div className="mt-4">
          <p className="font-medium text-xs font-google-sans-text text-[#444746]">
            Export as
          </p>
          <div className="flex flex-col mt-4">
            {(['csv', 'vcard', 'json'] as TExportType[]).map((format) => (
              <div
                key={format}
                className=" cursor-pointer flex items-center justify-start gap-2"
              >
                <div
                  className={`w-[40px] flex items-center justify-center h-[40px] rounded-full  ${
                    selectedFormat === format
                      ? 'hover:bg-blue-100'
                      : 'hover:bg-[#1f1f1f14]'
                  }`}
                >
                  <input
                    className="w-5 h-5 cursor-pointer"
                    type="radio"
                    name="exportFormat"
                    id={format}
                    value={format}
                    checked={selectedFormat === format}
                    onChange={selectFormat}
                  />
                </div>
                <label
                  className=" cursor-pointer font-google-sans text-[#1f1f1f] text-[1rem]"
                  htmlFor={format}
                >
                  {format.toUpperCase()}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center mt-6 gap-1">
          <button className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]">
            Cancel
          </button>
          <button
            className={` px-4 py-2 rounded-[16px] font-google-sans text-sm font-medium text-center  hover:bg-[rgba(11,87,208,0.08)] text-[#0b57d0] cursor-pointer`}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
