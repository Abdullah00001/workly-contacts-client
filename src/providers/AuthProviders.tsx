import { FC, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import {
  IAuthContext,
  IChildrenProps,
} from '../interfaces/authContext.interface';
import AuthServices from '../services/auth.services';
const { processCheck, processRefresh, processLogout } = AuthServices;
const AuthProviders: FC<IChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        await processCheck();
        setUser(true);
      } catch (error) {
        console.error(error);
        try {
          await processRefresh();
          setUser(true);
        } catch (error) {
          console.error(error);
          setUser(false);
          await processLogout();
          window.location.reload();
        }
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);
  const value: IAuthContext = { user, setUser, authChecked, setAuthChecked };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProviders;
