import { FC } from 'react';
import PageTitle from '../utils/PageTitle';
import { Outlet } from 'react-router-dom';

const AccountCenterLayout: FC = () => {
  return (
    <>
      <PageTitle
        title="Accounts Center"
        description="account center page for per user"
      />
      <Outlet />
    </>
  );
};

export default AccountCenterLayout;
