import { FC } from 'react';
import PublicRoute from './PublicRoute';
import Signup from '../../pages/Signup';

const SignupRouteWrapper: FC = () => {
  return (
    <PublicRoute>
      <Signup />
    </PublicRoute>
  );
};

export default SignupRouteWrapper;
