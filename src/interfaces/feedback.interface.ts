import { Dispatch, SetStateAction } from 'react';

export interface IFeedback {
  message: string;
}

export interface IFeedbackModalProps {
  handleIsFeedback: () => void;
  setIsFeedbackSuccess: Dispatch<SetStateAction<boolean>>;
}

export interface IFeedbackSuccessModal {
  setIsFeedbackSuccess: Dispatch<SetStateAction<boolean>>;
}
