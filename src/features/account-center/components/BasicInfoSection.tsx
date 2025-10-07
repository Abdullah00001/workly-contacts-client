'use client';
import { FC, useRef, useState } from 'react';
import { Camera, Edit, ChevronRight } from 'lucide-react';
import { TBasicInfoProps } from '../types/personal-info-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UpdateDateOfBirthModal from './UpdateDateOfBirthModal';
import UpdateGenderModal from './UpdateGenderModal';
import UpdateNameModal from './UpdateNameModal';
import UpdateProfileAvatarModal from './UpdateProfileAvatarModal';
import { UploadProfileAvatar } from '../services/personal-info-services';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';

const BasicInfoSection: FC<TBasicInfoProps> = ({
  avatar,
  dateOfBirth,
  gender,
  name,
}) => {
  const queryClient = useQueryClient();
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isDobModalOpen, setIsDobModalOpen] = useState(false);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: FormData) => await UploadProfileAvatar(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['personal_info'], (oldData: AxiosResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          avatar: data,
        };
      });
      toast.success('Profile Picture Uploaded', { closeButton: false });
    },
    onError: (error) => {
      console.error('Profile picture upload failed:', error);
      toast.error('Profile picture upload failed', { closeButton: false });
    },
  });
  const handleAvatarClick = () => {
    if (!avatar?.url) {
      fileInputRef.current?.click();
    } else {
      setIsAvatarModalOpen(true);
    }
  };
  const handleModalOpen = (field: 'name' | 'dob' | 'gender' | null) => {
    if (field === 'name') setIsNameModalOpen(true);
    if (field === 'gender') setIsGenderModalOpen(true);
    if (field === 'dob') setIsDobModalOpen(true);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const payload = new FormData();
    payload.append('avatar', file);
    mutate(payload);
  };
  return (
    <>
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
            <div
              className={'cursor-pointer relative w-[60px] h-[60px]'}
              onClick={handleAvatarClick}
            >
              <img
                className="w-full h-full rounded-full object-cover cursor-pointer"
                src={
                  avatar?.url
                    ? avatar.url
                    : `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
                }
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-600 rounded-full cursor-pointer flex items-center justify-center">
                {avatar.url ? (
                  <Edit className="w-3 h-3 text-white" />
                ) : (
                  <Camera className="w-3 h-3 text-white" />
                )}
              </div>
              {isPending && (
                <div className="absolute inset-0 bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <hr className="mt-3 mb-3 lg:mb-0 text-gray-400" />
        <div
          onClick={() => handleModalOpen('name')}
          className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 lg:border-b lg:border-gray-400 items-center justify-between w-full"
        >
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
        <div
          onClick={() => handleModalOpen('dob')}
          className="flex transition-all duration-300 lg:cursor-pointer lg:hover:bg-gray-50/5 lg:p-2 lg:border-b lg:border-gray-400 items-center justify-between w-full"
        >
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
        <div
          onClick={() => handleModalOpen('gender')}
          className="flex lg:cursor-pointer transition-all duration-300 lg:hover:bg-gray-50/5 lg:p-2 items-center justify-between w-full"
        >
          <div className="flex flex-col min-[620px]:w-[60%] min-[620px]:flex-row min-[620px]:justify-between min-[620px]:items-center">
            <h6 className="text-xs font-medium min-[620px]:w-[50%]">Gender</h6>
            {gender ? (
              <h5 className="text-[16px] font-normal mt-1 min-[620px]:w-[50%]">
                {gender}
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
      <UpdateDateOfBirthModal
        isUpdateDateOfBirthModalOpen={isDobModalOpen}
        setIsUpdateDateOfBirthModalOpen={setIsDobModalOpen}
        dateOfBirth={dateOfBirth as string}
      />
      <UpdateGenderModal
        gender={gender as string}
        isUpdateGenderModalOpen={isGenderModalOpen}
        setIsUpdateGenderModalOpen={setIsGenderModalOpen}
      />
      <UpdateNameModal
        name={name}
        isUpdateNameModalOpen={isNameModalOpen}
        setIsUpdateNameModalOpen={setIsNameModalOpen}
      />
      <UpdateProfileAvatarModal
        name={name}
        avatar={avatar}
        isUpdateProfileAvatarModalOpen={isAvatarModalOpen}
        setIsUpdateProfileAvatarModalOpen={setIsAvatarModalOpen}
      />
    </>
  );
};

export default BasicInfoSection;
