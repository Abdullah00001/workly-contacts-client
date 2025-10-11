'use client';
import Icon from '@/components/common/Icon';
import type { FC } from 'react';

const CreateContactHeader: FC = () => {
  return (
    <div className="pt-6 create-contact-header-padding-for-large-screen px-2">
      <div className="flex justify-between items-center w-full">
        <div className="w-12 h-12 flex justify-center items-center">
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
          <button className="h-10 px-6 bg-[#e4e4e4] rounded-[24px] text-[#9f9f9f]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContactHeader;
