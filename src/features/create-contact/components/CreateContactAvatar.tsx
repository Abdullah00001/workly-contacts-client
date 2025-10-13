'use client';
import Icon from '@/components/common/Icon';
import { useEffect, useRef, type FC } from 'react';
import { TFieldComponentProps } from '../types/type';
import { useMutation } from '@tanstack/react-query';
import {
  RemoveContactAvatar,
  UploadContactAvatar,
} from '../services/create-contact-service';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const CreateContactAvatar: FC<TFieldComponentProps> = ({
  payload,
  setPayload,
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { isPending: uploadPending, mutate: upload } = useMutation({
    mutationFn: async (imagePayload: FormData) =>
      await UploadContactAvatar(imagePayload),
    onSuccess: (data) => {
      setPayload((prev) => ({ ...prev, avatar: data?.image }));
      toast('Photo uploaded', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
          closeButton: false,
          position: 'bottom-center',
        });
      }
      toast.error('Photo upload failed,Try Again!', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
  });
  const { isPending: removePending, mutate: remove } = useMutation({
    mutationFn: async (publicId: string) => await RemoveContactAvatar(publicId),
    onSuccess: (data) => {
      setPayload((prev) => ({
        ...prev,
        avatar: { publicId: null, url: null },
      }));
      if (imageRef.current) imageRef.current.value = '';
      toast('Photo removed', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
          closeButton: false,
          position: 'bottom-center',
        });
      }
      toast.error('Photo remove failed,Try Again!', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
  });
  const loading = uploadPending || removePending;
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB.');
      return;
    }
    const imagePayload = new FormData();
    imagePayload.append('image', file);
    upload(imagePayload);
  };
  const removeImage = () => {
    if (loading) return;
    remove(payload.avatar?.publicId as string);
  };
  useEffect(() => {
    if (loading) {
      toast('Working on photo...', {
        closeButton: false,
        position: 'bottom-center',
      });
    }
  }, [loading]);

  return (
    <div className="flex-1 create-contact-header-avatar-container-for-large-screen">
      <div className="flex create-contact-header-avatar-positioning-for-large-screen justify-center items-center">
        <div className="create-contact-header-avatar-width-for-large-screen w-[100px] h-[100px] relative">
          <img
            onClick={() =>
              !payload?.avatar?.publicId && imageRef.current?.click()
            }
            className="object-cover w-full h-full rounded-full cursor-pointer hover:opacity-80"
            src={
              payload?.avatar?.url ||
              'https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png'
            }
            alt="empty_avatar"
          />
          <div className="absolute cursor-pointer create-contact-header-avatar-plus-outer-for-large-screen flex w-[42px] h-[42px] top-15 right-0 items-center justify-center bg-white rounded-full">
            <div
              onClick={
                !payload?.avatar?.publicId
                  ? () => imageRef.current?.click()
                  : removeImage
              }
              className=" create-contact-header-avatar-plus-inner-for-large-screen w-[36px] h-[36px] flex items-center justify-center bg-[#0b57d0] rounded-full"
            >
              {payload?.avatar?.publicId ? (
                <Icon
                  name="delete"
                  size={24}
                  type="symbols"
                  variant="outlined"
                  className="text-white"
                />
              ) : (
                <Icon
                  name="add"
                  size={24}
                  type="icons"
                  variant="filled"
                  className="text-white"
                />
              )}
            </div>
          </div>
          <input
            ref={imageRef}
            type="file"
            name="contactImage"
            id="contactImage"
            accept="image/*"
            className="hidden"
            onChange={(e) => !payload?.avatar?.publicId && handleUpload(e)}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateContactAvatar;
