import { Dispatch, SetStateAction } from 'react';
export interface IContactInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  avatar: IImage;
}

export enum Month {
  JANUARY = 'january',
  FEBRUARY = 'february',
  MARCH = 'march',
  APRIL = 'april',
  MAY = 'may',
  JUNE = 'june',
  JULY = 'july',
  AUGUST = 'august',
  SEPTEMBER = 'september',
  OCTOBER = 'october',
  NOVEMBER = 'november',
  DECEMBER = 'december',
}
export interface ILocation {
  country: string;
  city: string;
  postCode: number;
  streetAddress: string;
}

export type TLocation = {
  country: string | null;
  city: string | null;
  postCode: number | null;
  streetAddress: string | null;
};
export interface IWorksAt {
  companyName: string;
  jobTitle: string;
}

export type TWorksAt = {
  companyName: string | null;
  jobTitle: string | null;
};

export interface IBirthDate {
  day: number;
  month: Month;
  year: number;
}

export type TBirthDate = {
  day: number | null;
  month: Month | null;
  year: number | null;
};

export interface IImage {
  url: string;
  publicId: string;
}

export type TImage = {
  url: string | null;
  publicId: string | null;
};

export interface ICreateContactPayload {
  avatar?: IImage;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  worksAt?: IWorksAt;
  location?: ILocation;
  birthday?: IBirthDate;
}

export type TCreateContact = {
  avatar: TImage;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  worksAt: TWorksAt;
  location: TLocation;
  birthday: TBirthDate;
};

export interface IFavorite {
  isFavorite: boolean;
}

export interface IFavoritePayload {
  id: string;
  payload: IFavorite;
}

export type TContacts = {
  _id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  avatar: TImage;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  worksAt: TWorksAt;
  location: TLocation;
  birthday: TBirthDate;
  isFavorite: boolean;
  isTrashed: boolean;
  trashedAt: Date | string;
  userId: string;
};

export type TTrashContact = {
  name: string;
  avatar: TImage;
  _id: string;
  trashedAt: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IEditContactMainProps {
  setIsEdit: Dispatch<SetStateAction<true | false>>;
  isEdit: boolean;
  handleEdit: () => void;
  contactData: TContacts;
}
export interface IUpdateOneContactPayload {
  avatarImage?: string;
  avatar?: TImage;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  worksAt?: IWorksAt;
  location?: ILocation;
  birthday?: IBirthDate;
}
export type TEditContactPayload = IUpdateOneContactPayload | FormData;

export interface IEditContact {
  id: string;
  payload: TEditContactPayload;
}

export interface IBulkTrashPayload {
  contactIds: string[];
}

export interface IDiscardModal {
  handleResetState: () => void;
  setIsDiscardModalOpen: Dispatch<SetStateAction<boolean>>;
}

export type TEmail = string | null;

export interface ISearchResult {
  _id: string;
  name: string;
  email: TEmail;
  avatar: TImage;
}
