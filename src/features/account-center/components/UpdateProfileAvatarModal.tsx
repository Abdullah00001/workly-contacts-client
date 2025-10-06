'use client';
import { Dialog } from '@/components/ui/dialog';
import { FC } from 'react';
import { TUpdateProfileAvatarModalProps } from '../types/personal-info-types';

const UpdateProfileAvatarModal: FC<TUpdateProfileAvatarModalProps> = ({
  avatar,
  isUpdateProfileAvatarModalOpen,
  setIsUpdateProfileAvatarModalOpen,
}) => {
  return (
    <Dialog
      onOpenChange={setIsUpdateProfileAvatarModalOpen}
      open={isUpdateProfileAvatarModalOpen}
    ></Dialog>
  );
};

export default UpdateProfileAvatarModal;
