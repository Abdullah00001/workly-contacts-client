import { Dispatch, SetStateAction } from 'react';

export type TContactDetailsPageProps = {
  params: Promise<{ objectId: string }>;
  searchParams: Promise<{ edit?: string }>;
};

export type TContactDetailsProps = {
  objectId: string;
  isEditMode?: boolean;
};

export type TContactDetails = {
  _id: string;
  userId: string;
  linkedUserId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  avatar: {
    url: string | null;
    publicId: string | null;
  };
  birthday: {
    day: number | null;
    month: string;
    year: number | null;
  };
  location: {
    city: string | null;
    country: string | null;
    streetAddress: string | null;
    postCode: string | null;
  };
  worksAt: {
    companyName: string | null;
    jobTitle: string | null;
  };
  isFavorite: boolean;
  isTrashed: boolean;
  trashedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TContactDetailsInfoProps = {
  details: TContactDetails;
};

export type TContactDetailsEditProps = {
  details: TContactDetails;
};

export type TContactDetailInfoHeader = {
  details: TContactDetails;
};

export type TContactDetailsAvatar = {
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  companyName: string | null;
  jobTitle: string | null;
  _id: string;
};

export type TContactSummary = {
  _id: string;
  birthday: {
    day: number | null;
    month: string;
    year: number | null;
  };
  location: {
    city: string | null;
    country: string | null;
    streetAddress: string | null;
    postCode: string | null;
  };
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TToggleFavoriteStatus = {
  id: string;
  payload: {
    isFavorite: boolean;
  };
};

export type TTrashModal = {
  singleId?: string;
  bulkId?: string[];
  isDetailPage?: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectContact: Dispatch<SetStateAction<string[]>>;
};
