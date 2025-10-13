'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Countries } from '@/consts/const';
import { TFieldComponentProps } from '../types/type';
import { getIsoFromPayloadValue } from '../helpers/create-contact-helper';

const CreateContactPhone: FC<TFieldComponentProps> = ({
  payload,
  setPayload,
}) => {
  const [isPhoneFieldOpen, setPhoneFieldOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // update phone number
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload((prev) => ({
      ...prev,
      phone: {
        ...(prev.phone || {}),
        number: e.target.value,
      },
    }));
  };
  const isCodeSelect = payload.phone.countryCode;
  // update country code
  const handleCountryCodeChange = (value: string) => {
    setPayload((prev) => ({
      ...prev,
      phone: {
        ...(prev.phone || {}),
        countryCode: value,
      },
    }));
  };
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
                  className="h-10 cursor-pointer w-full rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
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
                className="h-10 cursor-pointer w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
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
                <Icon
                  className="text-[#747775]"
                  name="phone"
                  size={28}
                  type="icons"
                  variant="filled"
                />
              </div>
            </div>
            <div className="flex-[90%] flex gap-2">
              <Select onValueChange={handleCountryCodeChange}>
                <SelectTrigger className="!w-[84px] !min-w-[84px] !max-w-[84px] !flex-none !rounded-[4px] !h-10 !border !border-[#747775] !outline-0">
                  <SelectValue placeholder={'Code'}>
                    <img
                      src={`https://flagcdn.com/w20/${getIsoFromPayloadValue(payload?.phone?.countryCode)}.png`}
                      alt={'country_code'}
                      className="inline-block object-cover w-7 h-4"
                    />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="p-2 h-[400px]">
                  {Countries.map(({ code, iso, name }) => (
                    <SelectItem
                      className="flex items-center justify-start gap-2"
                      key={name}
                      value={code}
                    >
                      <img
                        src={`https://flagcdn.com/w20/${iso}.png`}
                        alt={iso}
                      />
                      <span>{name}</span>
                      <span>{code}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                disabled={!isCodeSelect}
                onChange={handlePhoneChange}
                placeholder="Phone"
                className={`!w-full h-10 placeholder:!text-[#747775] px-4 rounded-[4px] border  ${!isCodeSelect ? 'bg-[#f3f3f3] cursor-not-allowed text-[#9aa0a6] border-[#d0d4d9]' : 'bg-white border-[#747775] outline-0'}  appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield`}
                type="number"
                name="phone"
                id="phone"
                value={payload?.phone?.number as string}
              />
            </div>
            <button
              onClick={() => {
                setPayload((prev) => ({
                  ...prev,
                  phone: {
                    countryCode: '',
                    number: '',
                  },
                }));
                setPhoneFieldOpen(false);
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
                name="phone"
                size={28}
                type="icons"
                className="text-[#747775]"
                variant="filled"
              />
            </div>
            <div className="w-[520px] h-10 flex items-center justify-start gap-2">
              <Select onValueChange={handleCountryCodeChange}>
                <SelectTrigger className="!w-[84px] !min-w-[84px] !max-w-[84px] !flex-none !rounded-[4px] !h-full !border !border-[#747775] !outline-0">
                  <SelectValue placeholder={'Code'}>
                    <img
                      src={`https://flagcdn.com/w20/${getIsoFromPayloadValue(payload?.phone?.countryCode)}.png`}
                      alt={'country_code'}
                      className="inline-block object-cover w-[26px] h-[18px]"
                    />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="p-2 h-[400px]">
                  {Countries.map(({ code, iso, name }) => (
                    <SelectItem
                      className="flex items-center justify-start gap-2"
                      key={name}
                      value={code}
                    >
                      <img
                        src={`https://flagcdn.com/w20/${iso}.png`}
                        alt={iso}
                      />
                      <span>{name}</span>
                      <span>{code}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                disabled={!isCodeSelect}
                onChange={handlePhoneChange}
                placeholder="Phone"
                className={`w-full p-4 rounded-[4px] h-full border  placeholder:!text-[#747775] ${!isCodeSelect ? 'bg-[#f3f3f3] cursor-not-allowed text-[#9aa0a6] border-[#d0d4d9]' : 'border-[#747775] outline-0'}  appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield`}
                type="number"
                name="phone"
                id="phone"
                value={payload?.phone?.number as string}
              />
            </div>
            <button
              onClick={() => {
                setPayload((prev) => ({
                  ...prev,
                  phone: {
                    countryCode: '',
                    number: '',
                  },
                }));
                setPhoneFieldOpen(false);
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

export default CreateContactPhone;
