import { Dispatch, SetStateAction } from 'react';

export type TImage = {
  url: null | string;
  publicId: null | string;
};
export type TBasicInfoProps = {
  avatar: TImage;
  name: string;
  dateOfBirth: string | null;
  gender: string | null;
};

export type TUpdateNameModalProps = {
  name: string;
  isUpdateNameModalOpen: boolean;
  setIsUpdateNameModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TUpdateDateOfBirthModalProps = {
  dateOfBirth: string | null;
  isUpdateDateOfBirthModalOpen: boolean;
  setIsUpdateDateOfBirthModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TUpdateGenderModalProps = {
  gender: string | null;
  isUpdateGenderModalOpen: boolean;
  setIsUpdateGenderModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TUpdatePhoneNumberModalProps = {
  phone: string | null;
  isUpdatePhoneModalOpen: boolean;
  setIsUpdatePhoneModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TContactInfoProps = {
  email: string;
  phone: string | null;
};

export type TAddressInfoProps = {
  home: string | null;
  work: string | null;
};

export type TUpdateHomeAddressModalProps = {
  home: string | null;
  isUpdateHomeAddressModalOpen: boolean;
  setIsUpdateHomeAddressModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TUpdateWorkAddressModalProps = {
  work: string | null;
  isUpdateWorkAddressModalOpen: boolean;
  setIsUpdateWorkAddressModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TUpdateProfileAvatarModalProps = {
  avatar: TImage;
  isUpdateProfileAvatarModalOpen: boolean;
  setIsUpdateProfileAvatarModalOpen: Dispatch<SetStateAction<boolean>>;
};
