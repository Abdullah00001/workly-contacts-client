'use client';

import { type FC } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import { TContactDetailInfoHeader } from '../types/type';

const ContactDetailsHeader: FC<TContactDetailInfoHeader> = ({
  isFavorite,
  setIsEdit,
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center px-2 pt-2">
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
        <div className="w-12 h-12 flex justify-center items-center">
          <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
            <Icon
              name="star_border"
              size={22}
              variant="outlined"
              type="icons"
              className="text-[#444746]"
            />
          </div>
        </div>
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
        <div className="w-12 h-12 flex justify-center items-center">
          <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
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
          <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
            <Icon
              name="more_vert"
              size={22}
              variant="outlined"
              type="icons"
              className="text-[#444746]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsHeader;
