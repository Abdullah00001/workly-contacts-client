import { FC } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import AccountCenterLayout from '../../layouts/AccountCenterLayout';

const AccountsCenterProtectedRoute: FC = () => {
  const { user } = useAuthContext();
  if (!user) return window.location.href='/';
  return <AccountCenterLayout />;
};

export default AccountsCenterProtectedRoute;
