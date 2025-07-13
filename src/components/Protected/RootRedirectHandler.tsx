import { FC } from 'react';
import Main from '../../layouts/Main';
import AvatarDropDownProvider from '../../providers/AvatarDropDownProvider';
import Landing from '../../pages/Landing';
import useAuthContext from '../../hooks/useAuthContext';

const RootRedirectHandler: FC = () => {
  const { user } = useAuthContext();
  if (!user) return <Landing />;
  return (
    <AvatarDropDownProvider>
      <Main />
    </AvatarDropDownProvider>
  );
};

export default RootRedirectHandler;
