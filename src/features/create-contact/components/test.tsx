import React from 'react';

const test = () => {
  return (
    <div>
      <div className="pl-10 pt-10">
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
            <div className="lg:w-[520px] h-10 w-full">
              <input
                placeholder="First name"
                className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                type="text"
                name="firstName"
                id="firstName"
              />
            </div>
            <div className="lg:w-[520px] h-10 w-full">
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
      <div className="pl-10 pt-6">
        <div className="flex justify-start items-start gap-4">
          <div className="w-10 h-10 flex justify-center items-center">
            <Icon name="business" size={28} type="icons" variant="outlined" />
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <div className="lg:w-[520px] h-10 w-full">
              <input
                placeholder="Company"
                className="w-full p-4 rounded-[4px] h-full border border-[#747775] outline-0"
                type="text"
                name="company"
                id="company"
              />
            </div>
            <div className="lg:w-[520px] h-10 w-full">
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
      <div className="pl-10 pt-6 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10"></div>
          <button className="h-10 w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]">
            <Icon name="email" size={18} type="icons" variant="outlined" />
            <span className="font-google-sans-text font-medium text-sm">
              Add email
            </span>
          </button>
        </div>
      </div>
      <div className="pl-10 pt-6 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10"></div>
          <button className="h-10 w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]">
            <Icon name="phone" size={18} type="icons" variant="outlined" />
            <span className="font-google-sans-text font-medium text-sm">
              Add phone
            </span>
          </button>
        </div>
      </div>
      <div className="pl-10 pt-6 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10"></div>
          <button className="h-10 w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]">
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
      <div className="pl-10 pt-6 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10"></div>
          <button className="h-10 w-[520px] rounded-[20px] text-[#0b57d0] flex items-center justify-center gap-2 bg-[#f0f4f9]">
            <Icon name="cake" size={18} type="symbols" variant="outlined" />
            <span className="font-google-sans-text font-medium text-sm">
              Add birthday
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default test;
