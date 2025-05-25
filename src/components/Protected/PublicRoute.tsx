import { FC, useEffect, useState } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import useAuthContext from '../../hooks/useAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useRetrieveHashed from '../../hooks/useRetrieveHashed';
import { ClipLoader } from 'react-spinners';

const PublicRoute: FC<IChildrenProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const { user } = useAuthContext();
  const email = useRetrieveHashed();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkRoute = async () => {
      // Add small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (user) {
        navigate('/');
        return;
      }

      if (!user && email && location.pathname !== '/verify') {
        navigate('/verify');
        return;
      }

      setIsChecking(false);
    };

    checkRoute();
  }, [user, email, location.pathname, navigate]);

  // Show loading spinner while checking route permissions
  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  return <>{children}</>;
};

export default PublicRoute;
