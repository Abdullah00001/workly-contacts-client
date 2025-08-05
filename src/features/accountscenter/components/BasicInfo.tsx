import { FC, useRef } from 'react';
import { Camera, Edit, ChevronRight } from 'lucide-react';
import { TBasicInfoPageProps } from '../../../interfaces/accountcenter.interface';
import ProfileImageModal from '../../../components/ui/modal/ProfileImageModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import AuthServices from '../../../services/auth.services';
import { toast } from 'react-toastify';
import UpdateNameModal from '../../personalInfo/UpdateNameModal';
import UpdateDateOfBirthModal from '../../personalInfo/UpdateDateOfBirthModal';
import UpdateGenderModal from '../../personalInfo/UpdateGenderModal';

const { processUploadProfileAvatar } = AuthServices;

const BasicInfo: FC<TBasicInfoPageProps> = ({
  avatar,
  gender,
  name,
  dateOfBirth,
  setShowImageModal,
  showImageModal,
  modalType,
  setModalType,
}) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadAvatar, isPending: isAvatarUploadPending } =
    useMutation({
      mutationFn: async (payload: FormData) =>
        await processUploadProfileAvatar(payload),
      onSuccess: (data) => {
        toast.dismiss();
        const response = data?.data;
        queryClient.setQueryData(
          ['personal_info'],
          (oldData: AxiosResponse) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData?.data,
                data: {
                  ...oldData?.data?.data,
                  avatar: response,
                },
              },
            };
          }
        );
        toast.success('Profile picture updated');
      },
      onError: (error: AxiosError) => {
        console.error('Profile picture upload failed:', error);
        toast.dismiss();
        toast.error(
          (error?.response?.data as { message?: string })?.message ||
            'Failed to Upload Profile Picture. Please try again.'
        );
      },
    });
  const handleAvatarClick = () => {
    if (!avatar?.url) {
      fileInputRef.current?.click();
    } else {
      setShowImageModal(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const payload = new FormData();
    payload.append('avatar', file);
    uploadAvatar(payload);
  };
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
            {isAvatarUploadPending && (
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
        onClick={() => setModalType('name')}
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
        onClick={() => setModalType('dob')}
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
        onClick={() => setModalType('gender')}
        className="flex lg:cursor-pointer transition-all duration-300 lg:hover:bg-gray-50/5 lg:p-2 items-center justify-between w-full"
      >
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
      {showImageModal && (
        <ProfileImageModal
          avatar={avatar}
          setShowImageModal={setShowImageModal}
          showImageModal={showImageModal}
          name={name}
        />
      )}
      {modalType === 'name' && (
        <UpdateNameModal setModalType={setModalType} name={name} />
      )}
      {modalType === 'dob' && (
        <UpdateDateOfBirthModal
          setModalType={setModalType}
          dateOfBirth={dateOfBirth}
        />
      )}
      {modalType === 'gender' && (
        <UpdateGenderModal gender={gender} setModalType={setModalType} />
      )}
    </div>
  );
};

export default BasicInfo;
