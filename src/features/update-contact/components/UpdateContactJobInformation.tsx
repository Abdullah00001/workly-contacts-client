'use client';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';
import { TUpdateFieldComponentProps } from '../types/type';

const UpdateContactJobInformation: FC<TUpdateFieldComponentProps> = ({
  payload,
  setPayload,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleChangeWorksAt = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      worksAt: { ...prev.worksAt, [name]: value },
    }));
  };
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
                className="text-[#747775]"
                name="business"
                size={28}
                type="icons"
                variant="outlined"
              />
            </div>
          </div>
          <div className="flex-[90%] create-contact-name-input-group">
            <div className="flex flex-col justify-start items-start gap-3">
              <input
                onChange={handleChangeWorksAt}
                placeholder="Company Name"
                className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                type="text"
                name="companyName"
                id="companyName"
                value={payload?.worksAt?.companyName || ''}
              />
              <input
                onChange={handleChangeWorksAt}
                placeholder="Job Title"
                className="w-full h-10 px-4 rounded-[4px] border border-[#747775] outline-0"
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={payload?.worksAt?.jobTitle || ''}
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
            className="text-[#747775]"
            name="business"
            size={28}
            type="icons"
            variant="outlined"
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <div className="w-[520px] h-10">
            <input
              onChange={handleChangeWorksAt}
              placeholder="Company"
              className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
              type="text"
              name="companyName"
              id="companyName"
              value={payload?.worksAt?.companyName || ''}
            />
          </div>
          <div className="w-[520px] h-10">
            <input
              onChange={handleChangeWorksAt}
              placeholder="Job title"
              className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={payload?.worksAt?.jobTitle || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactJobInformation;
