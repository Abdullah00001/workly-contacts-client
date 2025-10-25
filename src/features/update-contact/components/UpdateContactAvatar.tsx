'use client';
import Icon from '@/components/common/Icon';
import { useEffect, useRef, useState, type FC } from 'react';
import { toast } from 'sonner';
import { TUpdateAvatarComponentProps } from '../types/type';
import UpdateContactAvatarModal from './UpdateContactAvatarModal';

const UpdateContactAvatar: FC<TUpdateAvatarComponentProps> = ({
  payload,
  setPayload,
  newImage,
  setNewImage,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
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
    setNewImage(file);
    setPayload((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, url: URL.createObjectURL(file) },
    }));
  };

  return (
    <div className="flex-1 create-contact-header-avatar-container-for-large-screen">
      <div className="flex create-contact-header-avatar-positioning-for-large-screen justify-center items-center">
        <div className="create-contact-header-avatar-width-for-large-screen w-[100px] h-[100px] relative">
          <img
            onClick={() =>
              !payload?.avatar?.publicId && !newImage
                ? imageRef.current?.click()
                : setOpen(true)
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
                !payload?.avatar?.publicId && !newImage
                  ? () => imageRef.current?.click()
                  : () => setOpen(true)
              }
              className=" create-contact-header-avatar-plus-inner-for-large-screen w-[36px] h-[36px] flex items-center justify-center bg-[#0b57d0] rounded-full"
            >
              {payload?.avatar?.url ? (
                <Icon
                  name="edit"
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
          />
        </div>
      </div>
      <UpdateContactAvatarModal
        newImage={newImage}
        setNewImage={setNewImage}
        open={open}
        setOpen={setOpen}
        payload={payload}
        setPayload={setPayload}
      />
    </div>
  );
};

export default UpdateContactAvatar;
