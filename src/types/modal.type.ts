import { Dispatch, SetStateAction } from 'react';

export type TDiscardModal = {
  open: boolean;
  onDiscard: () => void;
  onCancel: () => void;
};
