import { FC } from 'react';
import { Camera, ChevronRight } from 'lucide-react';

const BasicInfo: FC = () => {
  return (
    <div className="w-full  mt-4 border border-gray-500 p-4 rounded-[8px]">
      <h5 className="font-medium text-[16px]">Basic Info</h5>
      <div className="flex items-center justify-between w-full mt-2">
        <div className="w-[60%] flex flex-col">
          <h6 className="text-xs font-medium">Profile Picture</h6>
          <p className="text-[14px] font-normal mt-1">
            Profile Picture Helps To Personalize Your account
          </p>
        </div>
        <div className="w-[40%] flex justify-end relative">
          <img
            className="w-[60px] h-[60px] rounded-full object-cover cursor-pointer"
            src={
              'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww'
            }
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
            <Camera className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
      <hr className="mt-3 mb-3 text-gray-400" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%]">Name</h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]  whitespace-nowrap">
            Abdullah Bin Omar Chowdhury
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
      <hr className="mt-3 mb-3 text-gray-400" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%]">
            Date Of Birth
          </h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
            02 june 2002
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
      <hr className="mt-3 mb-3 text-gray-400" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%]">Gender</h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
            Male
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight size={25} className=" text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
