import { Edit, Trash2, X } from 'lucide-react';
import { FC, useRef } from 'react';
import { TProfileImageModal } from '../../../interfaces/accountcenter.interface';
import AuthServices from '../../../services/auth.services';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const { processRemoveProfileAvatar, processChangeProfileAvatar } = AuthServices;

const ProfileImageModal: FC<TProfileImageModal> = ({
  avatar,
  setShowImageModal,
  name,
}) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: changeAvatar, isPending: isAvatarChangePending } =
    useMutation({
      mutationFn: async (payload: FormData) =>
        await processChangeProfileAvatar(payload),
      onSuccess: (data) => {
        const response = data?.data;
        toast.dismiss();
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
        console.error('Profile picture update failed:', error);
        toast.dismiss();
        toast.error(
          (error?.response?.data as { message?: string })?.message ||
            'Profile Picture Update Failed. Please try again.'
        );
      },
    });
  const { mutate: removeAvatar, isPending: isAvatarRemovePending } =
    useMutation({
      mutationFn: async (payload: string) =>
        await processRemoveProfileAvatar(payload),
      onSuccess: () => {
        toast.dismiss();
        setTimeout(() => {
          setShowImageModal(false);
        }, 2000);
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
                  avatar: {
                    url: null,
                    publicId: null,
                  },
                },
              },
            };
          }
        );
        toast.success('Profile picture removed');
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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const payload = new FormData();
      payload.append('publicId', avatar.publicId as string);
      payload.append('avatar', file);
      changeAvatar(payload);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-lg">
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-3xl max-w-md w-full mx-4 shadow-2xl border border-slate-600/30">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 rounded-3xl opacity-50"></div>

        {/* Modal Header */}
        <div className="relative flex justify-between items-center p-6 border-b border-slate-600/30">
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Profile Picture
          </h2>
          <button
            onClick={() => setShowImageModal(false)}
            className="p-2 hover:bg-slate-700/50 rounded-xl transition-all duration-200 text-slate-300 hover:text-white hover:scale-105 group"
          >
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-200"
            />
          </button>
        </div>

        {/* Modal Content */}
        <div className="relative p-8">
          {/* Image Preview with enhanced styling */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

              <img
                src={
                  avatar?.url
                    ? avatar.url
                    : `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
                }
                alt="Avatar Preview"
                className="relative w-36 h-36 rounded-full object-cover border-2 border-slate-500/50 shadow-xl ring-4 ring-slate-700/50 transition-transform duration-300 group-hover:scale-105"
              />

              {/* Subtle overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {(isAvatarRemovePending || isAvatarChangePending) && (
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-white border-t-transparent"></div>
              </div>
            )}
          </div>

          {/* Action Buttons with modern styling */}
          <div className="flex space-x-4">
            <button
              onClick={handleEditClick}
              className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25 hover:shadow-xl group"
              disabled={isAvatarRemovePending || isAvatarChangePending}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Edit
                size={16}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-medium">Edit</span>
            </button>

            <button
              onClick={() => {
                removeAvatar(avatar.publicId as string);
              }}
              className="flex-1 relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-4 rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-500/25 hover:shadow-xl group"
              disabled={isAvatarChangePending || isAvatarRemovePending}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Trash2
                size={16}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-medium">Delete</span>
            </button>
          </div>

          {/* Subtle decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ProfileImageModal;
