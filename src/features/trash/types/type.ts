import { Dispatch, SetStateAction } from 'react';

export type TTrash = {
  _id: string;
  firstName: string;
  lastName: string;
  isTrashed: boolean;
  trashedAt: string;
  avatar: {
    url: string | null;
    publicId: string | null;
  };
};
export type TTrashTable = {
  trash: TTrash[];
};

export type TTrashTableRow = {
  trash: TTrash;
  selectedContacts: string[];
  setSelectContact: Dispatch<SetStateAction<string[]>>;
};
