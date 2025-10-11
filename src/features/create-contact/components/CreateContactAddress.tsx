'use client';

import { FC, useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';

const CreateContactAddress: FC = () => {
  const [isAddressFieldOpen, setAddressFieldOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 769);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  if (!isAddressFieldOpen)
    return (
      <>
        {isMobile ? (
          <div className="flex-1 px-4">
            <div className="flex items-start justify-start">
              <div className="flex-[2.6%]">
                <div className="w-10 h-10 flex justify-center items-center"></div>
              </div>
              <div className="flex-[90%]">
                <button
                  onClick={() => setAddressFieldOpen(true)}
                  className="h-10 w-full rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
                >
                  <Icon
                    name="location_on"
                    size={18}
                    type="icons"
                    variant="outlined"
                  />
                  <span className="font-google-sans-text font-medium text-sm">
                    Add address
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="pl-10 w-full">
            <div className="flex justify-start items-center gap-4">
              <div className="w-10"></div>
              <button
                onClick={() => setAddressFieldOpen(true)}
                className="h-10 w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
              >
                <Icon
                  name="location_on"
                  size={18}
                  type="icons"
                  variant="outlined"
                />
                <span className="font-google-sans-text font-medium text-sm">
                  Add address
                </span>
              </button>
            </div>
          </div>
        )}
      </>
    );
  return (
    <>
      {isMobile ? (
        <div className="flex-1 px-4">
          <div className="flex items-start justify-start">
            <div className="flex-[2.6%]">
              <div className="w-10 h-10 flex justify-center items-center">
                <Icon
                  name="location_on"
                  size={28}
                  type="icons"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="flex-[90%] create-contact-name-input-group">
              <div className="flex flex-col justify-start items-start gap-3">
                <input
                  placeholder="Company Name"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="companyName"
                  id="companyName"
                />
                <input
                  placeholder="Job Title"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                />
                <input
                  placeholder="Job Title"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                />
                <input
                  placeholder="Job Title"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pl-10">
          <div className="flex justify-start items-start gap-4">
            <div className="w-10 h-10 flex justify-center items-center">
              <Icon
                name="location_on"
                size={28}
                type="icons"
                variant="outlined"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="w-[520px] h-10">
                <input
                  placeholder="Company"
                  className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                  type="text"
                  name="company"
                  id="company"
                />
              </div>
              <div className="w-[520px] h-10">
                <input
                  placeholder="Job title"
                  className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                />
              </div>
              <div className="w-[520px] h-10">
                <input
                  placeholder="Job title"
                  className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                />
              </div>
              <div className="w-[520px] h-10">
                <input
                  placeholder="Job title"
                  className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContactAddress;
