import { FC, useEffect, useState } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';

const RecoverStep3Guard: FC<IChildrenProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermission = async () => {
      // Add small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300));

      const isExist = Cookies.get('r_stp3');
      if (isExist) {
        setHasPermission(true);
      } else {
        navigate('/recover');
      }
      setIsChecking(false);
    };

    checkPermission();
  }, [navigate]);

  // Show loading spinner while checking
  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  // Don't render if no permission
  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};

export default RecoverStep3Guard;
