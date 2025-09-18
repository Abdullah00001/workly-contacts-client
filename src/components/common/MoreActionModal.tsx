'use client';

import type { FC } from 'react';
import Icon from '@/components/common/Icon';

const MoreActionModal: FC = () => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="hidden sm:block absolute right-3 top-full mt-1 w-[270px] bg-white border border-gray-200  shadow-lg z-50 py-2"
    >
      <div className="pb-2 border-b">
        <button className="w-full text-left px-4 py-2 text-sm text-[#1F1F1F] hover:bg-gray-200 flex items-center gap-4 cursor-pointer">
          <Icon
            name="print"
            variant="filled"
            className="text-[#444746]"
            size={22}
            type="icons"
          />
          Print
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-[#1F1F1F] hover:bg-gray-200 flex items-center gap-4 cursor-pointer">
          <Icon
            name="file_upload"
            variant="outlined"
            className=" text-[#444746]"
            size={22}
            type="icons"
          />
          Export
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-[#1F1F1F] hover:bg-gray-200 flex items-center gap-4 cursor-pointer">
          <Icon
            name="delete"
            variant="outlined"
            className=" text-[#444746]"
            size={22}
            type="symbols"
          />
          Delete
        </button>
      </div>
      <div className="pt-2 w-full">
        <h5 className="px-4 w-full text-[#747776] text-xs font-google-sans-text">Change Labels</h5>
        <div className="mt-1 max-h-[300px] w-full overflow-auto">
          {['hello', 'hi', 'bye','go','next','nest','django','node','express'].map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 text-sm text-[#1F1F1F] hover:bg-gray-200 flex items-center gap-4 cursor-pointer"
            >
              <Icon
                name="label"
                variant="outlined"
                className=" text-[#444746]"
                size={22}
                type="symbols"
              />
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreActionModal;
