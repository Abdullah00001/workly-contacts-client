import { FC, useEffect } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import useAuthContext from '../../hooks/useAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useRetrieveHashed from '../../hooks/useRetrieveHashed';

const PublicRoute: FC<IChildrenProps> = ({ children }) => {
  const { user } = useAuthContext();
  const email = useRetrieveHashed();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (user) navigate('/');
    if (!user && email && location.pathname !== '/verify') {
      navigate('/verify');
    }
  }, [user, email, location.pathname,navigate]);
  return <>{children}</>;
};

export default PublicRoute;
