import { createContext } from 'react';
import { IAuthContext } from '../interfaces/authContext.interface';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default AuthContext;
