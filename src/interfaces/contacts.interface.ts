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
