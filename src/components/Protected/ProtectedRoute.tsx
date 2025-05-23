import { FC, useEffect } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import useAuthContext from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute: FC<IChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user,navigate]);
  return <>{children}</>;
};

export default ProtectedRoute;
