import { Dispatch, SetStateAction } from 'react';

export type TAvatar = {
  url: string | null;
  publicId: string | null;
};
export type TLocation = {
  country: string | null;
  city: string | null;
  postCode: number | null;
  streetAddress: string | null;
};
export type TBirthDate = {
  day: number | null;
  month: string;
  year: number | null;
};
export type TWorksAt = {
  companyName: string | null;
  jobTitle: string | null;
};

export type TPhone = {
  countryCode: string;
  number: string;
};

export type TContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: TPhone;
  avatar: TAvatar;
  location: TLocation;
  worksAt: TWorksAt;
  birthday: TBirthDate;
};

export type TFieldComponentProps = {
  payload: TContact;
  setPayload: Dispatch<SetStateAction<TContact>>;
};

export type TCreateContactFormProps = {
  payload: TContact;
  setPayload: Dispatch<SetStateAction<TContact>>;
};
