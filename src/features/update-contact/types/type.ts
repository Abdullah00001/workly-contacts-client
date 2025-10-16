import { TContactDetails } from '@/features/contact-details/types/type';
import { Dispatch, SetStateAction } from 'react';

export type TUpdateContactProps = {
  details: TContactDetails;
};

export type TUpdateContactDetails = {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: {
    countryCode: string;
    number: string;
  } | null;
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
};

export type TUpdateContactForm = {
  payload: TUpdateContactDetails;
  setPayload: Dispatch<SetStateAction<TUpdateContactDetails>>;
};

export type TUpdateFieldComponentProps = {
  payload: TUpdateContactDetails;
  setPayload: Dispatch<SetStateAction<TUpdateContactDetails>>;
};

export type TUpdateContactHeader = {};
