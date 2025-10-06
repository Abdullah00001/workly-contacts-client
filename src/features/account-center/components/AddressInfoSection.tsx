'use client'
import { FC, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { TAddressInfoProps } from '../types/personal-info-types';
import UpdateHomeAddressModal from './UpdateHomeAddressModal';
import UpdateWorkAddressModal from './UpdateWorkAddressModal';

const AddressInfoSection: FC<TAddressInfoProps> = ({ home, work }) => {
  const [isUpdateHomeAddressModalOpen, setIsUpdateHomeAddressModalOpen] =
    useState<boolean>(false);
  const [isUpdateWorkAddressModalOpen, setIsUpdateWorkAddressModalOpen] =
    useState<boolean>(false);
  const handleModalOpen = (field: 'work' | 'home') => {
    if (field === 'home') setIsUpdateHomeAddressModalOpen(true);
    if (field === 'work') setIsUpdateWorkAddressModalOpen(true);
  };
  return (
    <>
      <div className="w-full mt-4 mb-10 border border-gray-500 lg:px-4 lg:pt-6 lg:pb-4 p-4 rounded-[8px]">
        <h5 className="font-medium text-[16px]">Addresses</h5>
        <div className="mt-2">
          <div
            onClick={() => handleModalOpen('home')}
            className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 lg:border-b lg:border-gray-400 items-center justify-between w-full"
          >
            <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
              <h6 className="text-xs font-medium min-[620px]:w-[50%]">Home</h6>
              {home ? (
                <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
                  {home}
                </h5>
              ) : (
                <h5 className="text-[16px] text-blue-500 font-normal mt-1 min-[620px]:w-[50%]">
                  Add Home Address
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
          <hr className="lg:hidden mt-3 mb-3 text-gray-400" />
          <div
            onClick={() => handleModalOpen('work')}
            className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 items-center justify-between w-full"
          >
            <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
              <h6 className="text-xs font-medium min-[620px]:w-[50%]">Work</h6>
              {work ? (
                <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
                  {work}
                </h5>
              ) : (
                <h5 className="text-[16px] text-blue-500 font-normal mt-1 min-[620px]:w-[50%]">
                  Add Work Address
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
      <UpdateHomeAddressModal
        home={home}
        isUpdateHomeAddressModalOpen={isUpdateHomeAddressModalOpen}
        setIsUpdateHomeAddressModalOpen={setIsUpdateHomeAddressModalOpen}
      />
      <UpdateWorkAddressModal
        work={work}
        isUpdateWorkAddressModalOpen={isUpdateWorkAddressModalOpen}
        setIsUpdateWorkAddressModalOpen={setIsUpdateWorkAddressModalOpen}
      />
    </>
  );
};

export default AddressInfoSection;
