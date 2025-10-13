'use client';

import { FC, useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Month } from '@/consts/const';

const CreateContactBirthday: FC = () => {
  const [isBirthdayFieldOpen, setBirthdayFieldOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 769);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  if (!isBirthdayFieldOpen)
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
                  onClick={() => setBirthdayFieldOpen(true)}
                  className="h-10 cursor-pointer w-full rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
                >
                  <Icon
                    name="cake"
                    size={18}
                    type="symbols"
                    variant="outlined"
                  />
                  <span className="font-google-sans-text font-medium text-sm">
                    Add birthday
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
                onClick={() => setBirthdayFieldOpen(true)}
                className="h-10 cursor-pointer w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
              >
                <Icon name="cake" size={18} type="symbols" variant="outlined" />
                <span className="font-google-sans-text font-medium text-sm">
                  Add birthday
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
                  className="text-[#747775]"
                  name="cake"
                  size={28}
                  type="symbols"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="flex-[90%] flex  flex-col gap-2">
              <div className="flex justify-center items-center gap-2">
                <Select>
                  <SelectTrigger className="!w-full !rounded-[4px] !h-10 !border !border-[#747775] !outline-0">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="p-2">
                    {Object.values(Month).map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  placeholder="Birthday"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="birthday"
                  id="birthday"
                />
              </div>
              <div>
                <input
                  placeholder="Birthday"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="birthday"
                  id="birthday"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setBirthdayFieldOpen(false);
              }}
              className="w-10 h-10 flex justify-center items-center"
            >
              <Icon
                className="text-[#747775]"
                name="close"
                size={28}
                type="icons"
                variant="outlined"
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="pl-10">
          <div className="flex justify-start items-start gap-4">
            <div className="w-10 h-10 flex justify-center items-center">
              <Icon
                name="cake"
                size={28}
                type="symbols"
                className="text-[#747775]"
                variant="outlined"
              />
            </div>
            <div className="w-[520px] h-10 flex items-center gap-2">
              <Select>
                <SelectTrigger className="!w-full !rounded-[4px] !h-full !border !border-[#747775] !outline-0">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent className="p-2">
                  {Object.values(Month).map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                placeholder="Birthday"
                className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                type="text"
                name="company"
                id="company"
              />
              <input
                placeholder="Birthday"
                className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                type="text"
                name="company"
                id="company"
              />
            </div>
            <button
              onClick={() => {
                setBirthdayFieldOpen(false);
              }}
              className="w-10 h-10 flex justify-center cursor-pointer items-center"
            >
              <Icon
                className="text-[#747775]"
                name="close"
                size={28}
                type="icons"
                variant="outlined"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContactBirthday;
