import { Dispatch } from 'react';
export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface IAvatarDropDown {
  isLogOutClicked: boolean;
  setIsLogoutClicked: Dispatch<React.SetStateAction<boolean>>;
  isFeedBackClicked: boolean;
  setIsFeedBackClicked: Dispatch<React.SetStateAction<boolean>>;
}
