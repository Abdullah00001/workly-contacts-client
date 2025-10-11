'use client';
import Icon from '@/components/common/Icon';
import { type FC } from 'react';

const CreateContactAvatar: FC = () => {
  return (
    <div className="flex-1 create-contact-header-avatar-container-for-large-screen">
      <div className="flex create-contact-header-avatar-positioning-for-large-screen justify-center items-center">
        <div className="create-contact-header-avatar-width-for-large-screen w-[100px] h-[100px] relative">
          <img
            className="object-cover"
            src={
              'https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png'
            }
            alt="empty_avatar"
          />
          <div className="absolute create-contact-header-avatar-plus-outer-for-large-screen flex w-[42px] h-[42px] top-15 right-0 items-center justify-center bg-white rounded-full">
            <div className="create-contact-header-avatar-plus-inner-for-large-screen w-[36px] h-[36px] flex items-center justify-center bg-[#0b57d0] rounded-full">
              <Icon
                name="add"
                size={24}
                type="icons"
                variant="filled"
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContactAvatar;
