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
  location: TAddressInfoProps;
  isUpdateHomeAddressModalOpen: boolean;
  setIsUpdateHomeAddressModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TUpdateWorkAddressModalProps = {
  location: TAddressInfoProps;
  isUpdateWorkAddressModalOpen: boolean;
  setIsUpdateWorkAddressModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TUpdateProfileAvatarModalProps = {
  name: string;
  avatar: TImage;
  isUpdateProfileAvatarModalOpen: boolean;
  setIsUpdateProfileAvatarModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TProfileUpdatePayload = {
  location?: TAddressInfoProps;
  dateOfBirth?: string;
  name?: string;
  phone?: string;
  gender?: string;
};

export type SecurityOverviewData = {
  accountCreatedAt?: string;
  lastPasswordChange?: string;
  lastLoginBrowser?: string;
  lastLoginOs?: string;
  lastLoginLocation?: string;
  lastLoginTime?: string;
};

export type TSessionData = {
  sessionId: string;
  lastUsedAt: string;
  userId: string;
  browser: string;
  os: string;
  location: string;
  currentSession?: boolean;
};

export type TActiveSessionSectionProps = {
  sessions: TSessionData[];
};

export type TRecentActivityData = {
  _id: string;
  activityType: string;
  location: string;
  createdAt: string;
};

export type TRecentActivitySectionProps = {
  activities: TRecentActivityData[];
};
