import { FC, useEffect, useState } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import useAuthContext from '../../hooks/useAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useRetrieveHashed from '../../hooks/useRetrieveHashed';
import { ClipLoader } from 'react-spinners';

const PublicRoute: FC<IChildrenProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const { user, authChecked } = useAuthContext();
  const { email, isLoading } = useRetrieveHashed(); // Destructure the new return value
  const navigate = useNavigate();
  const location = useLocation();
  const PUBLIC_ONLY_ROUTES = ['/login', '/signup', '/verify', '/recover'];
  useEffect(() => {
    // Don't make any decisions while email is still loading
    if (!authChecked) return;
    if (isLoading) return;

    const checkRoute = async () => {
      // Add small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (user && PUBLIC_ONLY_ROUTES.includes(location.pathname)) {
        navigate('/', { replace: true });
        return;
      }

      if (!user && email && location.pathname !== '/verify') {
        navigate('/verify');
        return;
      }

      setIsChecking(false);
    };

    checkRoute();
  }, [
    user,
    email,
    isLoading,
    navigate,
    authChecked,
    location.pathname,
  ]); // Remove location.pathname to prevent navigation loops

  // Show loading spinner while checking route permissions or email is loading
  if (isChecking || isLoading) {
    return (
      <div className="flex justify-center bg-neutral-950 items-center min-h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  return <>{children}</>;
};

export default PublicRoute;
