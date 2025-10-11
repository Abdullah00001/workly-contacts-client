'use client';

import { FC, useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';

const CreateContactPhone: FC = () => {
  const [isPhoneFieldOpen, setPhoneFieldOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 769);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  if (!isPhoneFieldOpen)
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
                  onClick={() => setPhoneFieldOpen(true)}
                  className="h-10 w-full rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
                >
                  <Icon
                    name="phone"
                    size={18}
                    type="icons"
                    variant="outlined"
                  />
                  <span className="font-google-sans-text font-medium text-sm">
                    Add phone
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
                onClick={() => setPhoneFieldOpen(true)}
                className="h-10 w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
              >
                <Icon name="phone" size={18} type="icons" variant="outlined" />
                <span className="font-google-sans-text font-medium text-sm">
                  Add phone
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
                <Icon name="phone" size={28} type="icons" variant="outlined" />
              </div>
            </div>
            <div className="flex-[90%]">
              <input
                placeholder="Phone"
                className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                type="text"
                name="phone"
                id="phone"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pl-10">
          <div className="flex justify-start items-start gap-4">
            <div className="w-10 h-10 flex justify-center items-center">
              <Icon name="phone" size={28} type="icons" variant="outlined" />
            </div>
            <div className="w-[520px] h-10">
              <input
                placeholder="Phone"
                className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                type="text"
                name="company"
                id="company"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContactPhone;
