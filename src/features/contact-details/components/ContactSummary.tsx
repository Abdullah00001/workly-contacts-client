'use client';

import { type FC } from 'react';
import { TContactSummary } from '../types/type';
import Icon from '@/components/common/Icon';
import { formatSmartDate } from '../helpers/date';

const ContactSummary: FC<TContactSummary> = ({
  birthday,
  createdAt,
  email,
  location,
  phone,
  updatedAt,
  setIsEdit,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-4 px-6 pb-4">
      <div className="p-4 rounded-[16px] bg-[#f0f4f9]">
        <h1 className="text-4 font-medium font-google-sans text-[#1f1f1f]">
          Contact Details
        </h1>
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex justify-start items-center gap-3">
            <Icon
              name="email"
              size={20}
              type="icons"
              variant="outlined"
              className="text-[#444746]"
            />
            {email ? (
              <span className="text-[14px] text-[#1f1f1f] font-normal font-google-sans-text">
                {email}
              </span>
            ) : (
              <span
                onClick={() => setIsEdit(true)}
                className="text-[#0b57d0] font-normal font-google-sans-text text-[14px]"
              >
                Add email
              </span>
            )}
          </div>
          <div className="flex justify-start items-center gap-3">
            <Icon
              name="phone"
              size={20}
              type="symbols"
              variant="outlined"
              className="text-[#444746]"
            />
            {phone?.number ? (
              <span className="text-[14px] text-[#1f1f1f] font-normal font-google-sans-text">
                {phone?.number}
              </span>
            ) : (
              <span
                onClick={() => setIsEdit(true)}
                className="text-[#0b57d0] font-normal font-google-sans-text text-[14px]"
              >
                Add Phone
              </span>
            )}
          </div>
          <div className="flex justify-start items-start gap-3">
            <Icon
              name="location_on"
              size={20}
              type="symbols"
              variant="outlined"
              className="text-[#444746]"
            />
            {location?.streetAddress ||
            location?.city ||
            location?.postCode ||
            location?.country ? (
              <span className="flex flex-col">
                <span className="text-[14px] text-[#1f1f1f] font-normal font-google-sans-text">
                  {location?.streetAddress}
                </span>
                <span className="text-[14px] text-[#1f1f1f] font-normal font-google-sans-text">
                  {location?.city}
                </span>
                <span className="text-[14px] text-[#1f1f1f] font-normal font-google-sans-text">
                  {location?.postCode}
                </span>
                <span className="text-[14px] text-[#1f1f1f] font-normal font-google-sans-text">
                  {' '}
                  {location?.country}
                </span>
              </span>
            ) : (
              <span
                onClick={() => setIsEdit(true)}
                className="text-[#0b57d0] font-normal font-google-sans-text text-[14px]"
              >
                Add location
              </span>
            )}
          </div>
          <div className="flex justify-start items-center gap-3">
            <Icon
              name="cake"
              size={20}
              type="symbols"
              variant="outlined"
              className="text-[#444746]"
            />
            <span className="text-[14px] text-[#1f1f1f] font-normal font-google-sans-text">
              {birthday?.month || birthday?.day || birthday?.year ? (
                <>
                  {(birthday?.month).charAt(0) +
                    (birthday?.month).slice(1).toLowerCase()}{' '}
                  {birthday?.day} {birthday?.year}
                </>
              ) : (
                <span
                  onClick={() => setIsEdit(true)}
                  className="text-[#0b57d0] font-normal font-google-sans-text text-[14px]"
                >
                  Add birthday
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-4 font-medium font-google-sans text-[#1f1f1f]">
          History
        </h1>
        <div className="flex flex-col gap-3 mt-2">
          <span className="text-[14px] text-[#1f1f1f] font-google-sans-text">
            Last edited •{' '}
            <span className="text-xs text-[#444746]">
              {formatSmartDate(updatedAt)}
            </span>
          </span>
          <span className="text-[14px] text-[#1f1f1f] font-google-sans-text">
            Added to contacts •{' '}
            <span className="text-xs text-[#444746]">
              {formatSmartDate(createdAt)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactSummary;
