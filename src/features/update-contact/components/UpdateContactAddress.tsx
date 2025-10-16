'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';
import { TUpdateFieldComponentProps } from '../types/type';

const UpdateContactAddress: FC<TUpdateFieldComponentProps> = ({
  setPayload,
  payload,
}) => {
  const [isAddressFieldOpen, setAddressFieldOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue =
      name === 'postCode'
        ? value === ''
          ? null
          : Number(value)
        : value === ''
          ? null
          : value;
    setPayload((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: updatedValue,
      },
    }));
  };
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 769);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  if (
    !isAddressFieldOpen &&
    (!payload.location?.city ||
      !payload.location?.country ||
      !payload.location?.postCode ||
      !payload.location?.streetAddress)
  )
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
                  className="h-10 cursor-pointer w-full rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
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
                className="h-10 cursor-pointer w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]"
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
                  className="text-[#747775]"
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
                  onChange={handleChangeLocation}
                  placeholder="Country"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="country"
                  id="country"
                  value={payload?.location?.country || ''}
                />
                <input
                  onChange={handleChangeLocation}
                  placeholder="City"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="city"
                  id="city"
                  value={payload?.location?.city || ''}
                />
                <input
                  onChange={handleChangeLocation}
                  placeholder="Post Code"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                  type="number"
                  name="postCode"
                  id="postCode"
                  value={payload?.location?.postCode || ''}
                />
                <input
                  onChange={handleChangeLocation}
                  placeholder="Street Address"
                  className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  value={payload?.location?.streetAddress || ''}
                />
              </div>
            </div>
            <button
              onClick={() => {
                setPayload((prev) => ({
                  ...prev,
                  location: {
                    country: '',
                    city: '',
                    postCode: null,
                    streetAddress: '',
                  },
                }));
                setAddressFieldOpen(false);
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
                className="text-[#747775]"
                name="location_on"
                size={28}
                type="icons"
                variant="outlined"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="w-[520px] h-10">
                <input
                  onChange={handleChangeLocation}
                  placeholder="Country"
                  className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                  type="text"
                  name="country"
                  id="country"
                  value={payload?.location?.country || ''}
                />
              </div>
              <div className="w-[520px] h-10">
                <input
                  onChange={handleChangeLocation}
                  placeholder="City"
                  className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                  type="text"
                  name="city"
                  id="city"
                  value={payload?.location?.city || ''}
                />
              </div>
              <div className="w-[520px] h-10">
                <input
                  onChange={handleChangeLocation}
                  placeholder="Post Code"
                  className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                  type="number"
                  name="postCode"
                  id="postCode"
                  value={payload?.location?.postCode || ''}
                />
              </div>
              <div className="w-[520px] h-10">
                <input
                  onChange={handleChangeLocation}
                  placeholder="Street Address"
                  className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  value={payload?.location?.streetAddress || ''}
                />
              </div>
            </div>
            <button
              onClick={() => {
                setPayload((prev) => ({
                  ...prev,
                  location: {
                    country: '',
                    city: '',
                    postCode: null,
                    streetAddress: '',
                  },
                }));
                setAddressFieldOpen(false);
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

export default UpdateContactAddress;
