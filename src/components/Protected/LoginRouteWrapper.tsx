import { FC } from 'react';
import PublicRoute from './PublicRoute';
import Login from '../../pages/Login';

const LoginRouteWrapper: FC = () => {
  return (
    <PublicRoute>
      <Login />
    </PublicRoute>
  );
};

export default LoginRouteWrapper;
