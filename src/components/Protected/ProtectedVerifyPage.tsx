import { FC, useEffect } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import useRetrieveHashed from '../../hooks/useRetrieveHashed';
import { useNavigate } from 'react-router-dom';

const ProtectedVerifyPage: FC<IChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const email = useRetrieveHashed();
  useEffect(() => {
    if (!email) return;
    if (!email) {
      navigate('/');
    }
  }, [email,navigate]);
  return <>{children}</>;
};

export default ProtectedVerifyPage;
