import { FC } from 'react';
import { ChevronRight } from 'lucide-react';

const SecurityOverview: FC = () => {
  return (
    <div className="w-full  mt-4 mb-4 border border-gray-500 p-4 rounded-[8px]">
      <h5 className="font-medium text-[16px]">Security Overview</h5>
      <div className="flex mt-2 items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%]">Password</h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%] whitespace-nowrap">
            Last Changed July 26,2025
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
      <hr className="mt-3 mb-3 text-gray-400" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%] ">
            Last Logged In
          </h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
            July 25, 2025, 08:31PM
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
      <hr className="mt-3 mb-3 text-gray-400" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%] ">
            Last Login Location
          </h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
            Dhaka,Bangladesh
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
      <hr className="mt-3 mb-3 text-gray-400" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%] ">
            Last Login Device
          </h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
            Google Chrome On Linux
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
      <hr className="mt-3 mb-3 text-gray-400" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%] ">
            Account Created On
          </h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
            July 02,2023
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
      <hr className="mt-3 mb-3 text-gray-400" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%] ">
            Close Account
          </h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%] whitespace-nowrap">
            Delete your account and data.
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SecurityOverview;
