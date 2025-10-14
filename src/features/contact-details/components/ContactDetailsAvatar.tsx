'use client';

import { type FC } from 'react';
import { TContactDetailsAvatar } from '../types/type';
import Icon from '@/components/common/Icon';

const ContactDetailsAvatar: FC<TContactDetailsAvatar> = ({
  avatarUrl,
  setIsEdit,
  firstName,
  lastName,
  companyName,
  jobTitle,
}) => {
  return (
    <div className="w-full flex gap-5 flex-col items-center justify-center mt-6 contact-details-avatar-container">
      <div
        className="w-[calc(112px+((100vw-320px)/448*156))] 
                h-[calc(112px+((100vw-320px)/448*156))] flex justify-center items-center rounded-full cursor-pointer relative contact-details-avatar-width-height"
      >
        <img
          className="object-cover w-full h-full cursor-pointer hover:opacity-80 rounded-full"
          src={
            avatarUrl ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}`
          }
          alt="empty_avatar"
          onClick={() => !avatarUrl && setIsEdit(true)}
        />
        {!avatarUrl && (
          <div
            className="absolute bg-white rounded-full top-[70%] right-0 flex justify-center items-center avatar-plus-outer"
            style={{
              width: 'calc(30px + ((100vw - 320px)/448 * 43))',
              height: 'calc(30px + ((100vw - 320px)/448 * 43))',
            }}
          >
            <div
              onClick={() => setIsEdit(true)}
              className="flex items-center justify-center bg-[#c2e7ff] rounded-full avatar-plus-inner"
              style={{
                width: 'calc(25px + ((100vw - 320px)/448 * 37))',
                height: 'calc(25px + ((100vw - 320px)/448 * 37))',
              }}
            >
              <Icon
                name="add"
                size={24}
                type="icons"
                variant="filled"
                className="text-black"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 justify-center items-center avatar-details-name-container">
        <h1 className="text-center text-[28px] font-normal font-sans text-[#1f1f1f]">
          {firstName} {lastName}
        </h1>
        <div className="flex justify-center items-center flex-wrap">
          {companyName && jobTitle && (
            <>
              <span className="text-4 font-google-sans text-[#1f1f1f]">
                {jobTitle}
              </span>
              <span className="px-1 text-[#1f1f1f]">•</span>
              <span className="text-4 font-google-sans text-[#1f1f1f]">
                {companyName}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsAvatar;
