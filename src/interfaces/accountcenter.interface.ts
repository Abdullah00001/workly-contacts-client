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
  setModalType: Dispatch<SetStateAction<TModalState>>;
  modalType: string | null;
};

export type TUpdateDateOfBirthModalProps = {
  setModalType: Dispatch<SetStateAction<TModalState>>;
  dateOfBirth: string | null;
};

export type TUpdateGenderModalProps = {
  setModalType: Dispatch<SetStateAction<TModalState>>;
  gender: string | null;
};

export type TUpdateNameModalProps = {
  setModalType: Dispatch<SetStateAction<TModalState>>;
  name: string;
};

export type TUpdateHomeAddressModalProps = {
  setModalType: Dispatch<SetStateAction<TModalState>>;
  work: string | null;
  home: string | null;
};

export type TUpdateWorkAddressModalProps = {
  setModalType: Dispatch<SetStateAction<TModalState>>;
  work: string | null;
  home: string | null;
};

export type TUpdatePhoneModalProps = {
  setModalType: Dispatch<SetStateAction<TModalState>>;
  phone: string | null;
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
  setModalType: Dispatch<SetStateAction<TModalState>>;
  modalType: string | null;
};

export type TAddressInfoPageProps = {
  work: string | null;
  home: string | null;
  setModalType: Dispatch<SetStateAction<TModalState>>;
  modalType: string | null;
};

export interface IRemoveProfileAvatarPayload {
  publicId: string;
}

export type TModalState =
  | 'name'
  | 'dob'
  | 'gender'
  | 'phone'
  | 'home'
  | 'work'
  | null;

export interface IProfileLocation {
  home?: string;
  work?: string;
}
export interface IProfileUpdatePayload {
  location?: IProfileLocation;
  dateOfBirth?: string;
  name?: string;
  phone?: string;
  gender?: string;
}
