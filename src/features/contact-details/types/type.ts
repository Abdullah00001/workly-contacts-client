import { Dispatch, SetStateAction } from 'react';

export type TContactDetailsPageProps = {
  params: Promise<{ objectId: string }>;
};

export type TContactDetailsProps = {
  objectId: string;
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
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  details: TContactDetails;
};

export type TContactDetailsEditProps = {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  details: TContactDetails;
};

export type TContactDetailInfoHeader = {
  isFavorite: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export type TContactDetailsAvatar = {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  companyName: string | null;
  jobTitle: string | null;
};

export type TContactSummary = {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
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
