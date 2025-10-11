'use client';

import { FC, useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';

const CreateContactName: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 769);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  if (isMobile)
    return (
      <div className="flex-1 px-4">
        <div className="flex items-start justify-start">
          <div className="flex-[2.6%]">
            <div className="w-10 h-10 flex justify-center items-center">
              <Icon
                name="person_outline"
                size={28}
                type="icons"
                variant="outlined"
              />
            </div>
          </div>
          <div className="flex-[90%]">
            <div className="flex flex-col justify-start items-start gap-3">
              <input
                placeholder="First name"
                className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                type="text"
                name="firstName"
                id="firstName"
              />
              <input
                placeholder="Last name"
                className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                type="text"
                name="lastName"
                id="lastName"
              />
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="pl-10">
      <div className="flex justify-start items-start gap-4">
        <div className="w-10 h-10 flex justify-center items-center">
          <Icon
            name="person_outline"
            size={28}
            type="icons"
            variant="outlined"
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <div className="w-[520px] h-10">
            <input
              placeholder="First name"
              className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
              type="text"
              name="firstName"
              id="firstName"
            />
          </div>
          <div className="w-[520px] h-10">
            <input
              placeholder="Last name"
              className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
              type="text"
              name="lastName"
              id="lastName"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContactName;
