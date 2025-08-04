import { Dispatch, SetStateAction } from 'react';
import { TImage } from './contacts.interface';

export type TGetProfileData = {
  name: string | null;
  email: string | null;
  avatar: {
    url: string | null;
    publicId: string | null;
  };
  phone: string | null;
};

export type TBasicInfoPageProps = {
  name: string;
  avatar: TImage;
  gender: string | null;
  dateOfBirth: string | null;
  setShowImageModal: Dispatch<SetStateAction<true | false>>;
  showImageModal: boolean;
};

export type TProfileImageModal = {
  setShowImageModal: Dispatch<SetStateAction<true | false>>;
  showImageModal: boolean;
  avatar: TImage;
  name: string;
};

export type TContactsInfoPageProps = {
  phone: string | null;
  email: string | null;
};

export type TAddressInfoPageProps = {
  work: string | null;
  home: string | null;
};

export interface IRemoveProfileAvatarPayload {
  publicId: string;
}
