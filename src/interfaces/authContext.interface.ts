import { Dispatch, SetStateAction } from 'react';

export interface IAuthContext {
  user: boolean;
  setUser: Dispatch<SetStateAction<true | false>>;
  authChecked: boolean;
  setAuthChecked: Dispatch<SetStateAction<true | false>>;
}

export interface IChildrenProps {
  children: React.ReactNode;
}
