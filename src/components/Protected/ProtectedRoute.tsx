import { FC, useEffect, useState } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import useAuthContext from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ProtectedRoute: FC<IChildrenProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Add small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!user) {
        navigate('/login', { replace: true });
        return;
      }

      setIsChecking(false);
    };

    checkAuthentication();
  }, [user, navigate]);

  // Show loading spinner while checking authentication
  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
