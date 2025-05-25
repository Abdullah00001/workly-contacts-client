import { FC, useEffect, useState } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import useRetrieveHashed from '../../hooks/useRetrieveHashed';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ProtectedVerifyPage: FC<IChildrenProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const navigate = useNavigate();
  const { email, isLoading } = useRetrieveHashed(); // Destructure the new return value

  useEffect(() => {
    // Don't make any decisions while email is still loading
    if (isLoading) return;

    const checkEmailAccess = async () => {
      // Add small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!email) {
        navigate('/');
        return;
      }

      setIsChecking(false);
    };

    checkEmailAccess();
  }, [email, isLoading, navigate]); // Add isLoading to dependencies

  // Show loading spinner while checking email access or email is loading
  if (isChecking || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedVerifyPage;
