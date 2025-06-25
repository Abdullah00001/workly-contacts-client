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
export interface IWorksAt {
  companyName: string;
  jobTitle: string;
}

export interface IBirthDate {
  day: number;
  month: Month;
  year: number;
}

export interface IImage {
  url: string;
  publicId: string;
}

export interface ICreateContactPayload {
  avatar?: IImage;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  worksAt?: IWorksAt;
  location?: ILocation;
  birthday?: IBirthDate;
}

export type TCreateContact = {
  avatar: IImage | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  worksAt: IWorksAt | null;
  location: ILocation | null;
  birthday: IBirthDate | null;
};
