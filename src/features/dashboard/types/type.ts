import { TContacts } from '@/components/common/ContactTable';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

export type TMoreActionDropDown = {
  contact: TContacts;
  isSelected: boolean;
  isMoreActionOpen: boolean;
  setIsMoreActionOpen: Dispatch<SetStateAction<boolean>>;
  setSelectContact: Dispatch<SetStateAction<string[]>>;
  handleMoreActionsClick: (e: MouseEvent) => void;
  singleExportModalOpen: boolean;
  setSingleExportModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TPrintModal = {
  selectedContacts: string[];
  setSelectContact: Dispatch<SetStateAction<string[]>>;
  allContacts: string[];
  printModalOpen: boolean;
  setPrintModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TMultiExportModal = {
  selectedContacts: string[];
  setSelectContact: Dispatch<SetStateAction<string[]>>;
  allContacts: string[];
  multiExportModalOpen: boolean;
  setMultiExportModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TSingleExportModal = {
  contactId: string;
  singleExportModalOpen: boolean;
  setSingleExportModalOpen: Dispatch<SetStateAction<boolean>>;
};

export interface Contact {
  birthday?: { day: number; month: string; year: number };
  email?: string;
  firstName?: string;
  lastName?: string;
  location?: {
    city?: string;
    country?: string;
    postCode?: number;
    streetAddress?: string;
  };
  phone?: {
    countryCode?: string;
    number?: string;
  };
  worksAt?: {
    companyName?: string;
    jobTitle?: string;
  };
}
