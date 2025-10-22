import { TContacts } from '@/components/common/ContactTable';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

export type TMoreActionDropDown = {
  contact: TContacts;
  isSelected: boolean;
  isMoreActionOpen: boolean;
  setIsMoreActionOpen: Dispatch<SetStateAction<boolean>>;
  setSelectContact: Dispatch<SetStateAction<string[]>>;
  handleMoreActionsClick: (e: MouseEvent) => void;
};
