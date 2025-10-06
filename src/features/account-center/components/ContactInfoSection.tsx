'use client';
import { FC, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import UpdatePhoneNumberModal from './UpdatePhoneNumberModal';
import { TContactInfoProps } from '../types/personal-info-types';

const ContactInfoSection: FC<TContactInfoProps> = ({ email, phone }) => {
  const [isUpdatePhoneModalOpen, setIsUpdatePhoneModalOpen] =
    useState<boolean>(false);
  const handleOpenUpdatePhoneModal = () => {
    setIsUpdatePhoneModalOpen(true);
  };
  return (
    <>
      <div className="w-full mt-4 border border-gray-500 lg:px-4 lg:pt-6 lg:pb-4 p-4 rounded-[8px]">
        <h5 className="font-medium text-[16px]">Contact Info</h5>
        <div className="mt-2">
          <div className="relative">
            <div className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 lg:border-b lg:border-gray-400 items-center justify-between w-full">
              <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
                <h6 className="text-xs font-medium min-[620px]:w-[50%]">
                  Email
                </h6>
                <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
                  {email}
                </h5>
              </div>
              <div className="flex justify-end min-[620px]:w-[40%]">
                <ChevronRight
                  size={25}
                  className="transition-transform duration-200 hover:translate-x-1 text-gray-400"
                />
              </div>
            </div>
          </div>
          <hr className="lg:hidden mt-3 mb-3 text-gray-400" />
          <div
            onClick={handleOpenUpdatePhoneModal}
            className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 items-center justify-between w-full"
          >
            <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
              <h6 className="text-xs font-medium min-[620px]:w-[50%]">Phone</h6>
              {phone ? (
                <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
                  {phone}
                </h5>
              ) : (
                <h5 className="text-[16px] text-blue-500 font-normal mt-1 min-[620px]:w-[50%]">
                  Add phone
                </h5>
              )}
            </div>
            <div className="flex justify-end min-[620px]:w-[40%]">
              <ChevronRight
                size={25}
                className="transition-transform duration-200 hover:translate-x-1 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
      <UpdatePhoneNumberModal
        isUpdatePhoneModalOpen={isUpdatePhoneModalOpen}
        setIsUpdatePhoneModalOpen={setIsUpdatePhoneModalOpen}
        phone={phone}
      />
    </>
  );
};

export default ContactInfoSection;
