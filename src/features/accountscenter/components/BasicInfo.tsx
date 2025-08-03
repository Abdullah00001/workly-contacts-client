import { FC } from 'react';
import { Camera, ChevronRight } from 'lucide-react';
import { TBasicInfoPageProps } from '../../../interfaces/accountcenter.interface';

const BasicInfo: FC<TBasicInfoPageProps> = ({
  avatar,
  gender,
  name,
  dateOfBirth,
}) => {
  return (
    <div className="w-full mt-4 border border-gray-500 lg:px-4 lg:pt-6 lg:pb-4 p-4 rounded-[8px]">
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
              avatar?.url
                ? avatar.url
                : `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
            }
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-600 rounded-full cursor-pointer flex items-center justify-center">
            <Camera className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
      <hr className="mt-3 text-gray-400" />
      <div className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 lg:border-b lg:border-gray-400 items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%]">Name</h6>
          <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]  whitespace-nowrap">
            {name}
          </h5>
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight
            size={25}
            className="transition-transform duration-200 hover:translate-x-1 text-gray-400"
          />
        </div>
      </div>
      <hr className="lg:hidden mt-3 mb-3 text-gray-400" />
      <div className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 lg:border-b lg:border-gray-400 items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%]">
            Date Of Birth
          </h6>
          {dateOfBirth ? (
            <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
              {dateOfBirth}
            </h5>
          ) : (
            <h5 className="text-[16px] text-blue-500 font-normal mt-1 min-[620px]:w-[50%]">
              Add date of birth
            </h5>
          )}
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight
            size={25}
            className="transition-transform duration-200 hover:translate-x-1 text-gray-400"
          />
        </div>
      </div>
      <hr className="lg:hidden mt-3 mb-3 text-gray-400" />
      <div className="flex lg:cursor-pointer transition-all duration-300 lg:hover:bg-gray-50/5 lg:p-2 items-center justify-between w-full">
        <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
          <h6 className="text-xs font-medium min-[620px]:w-[50%]">Gender</h6>
          {gender ? (
            <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
              <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
                {gender}
              </h5>
            </h5>
          ) : (
            <h5 className="text-[16px] text-blue-500 font-normal mt-1 min-[620px]:w-[50%]">
              Add gender
            </h5>
          )}
        </div>
        <div className="flex justify-end min-[620px]:w-[40%]">
          <ChevronRight
            size={25}
            className="transition-transform duration-200 hover:translate-x-1 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
