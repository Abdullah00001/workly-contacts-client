import { FC, useEffect, useState } from 'react';
import { IChildrenProps } from '../../interfaces/authContext.interface';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import AuthServices from '../../services/auth.services';
import Cookies from 'js-cookie';

const { processCheckR_stp1 } = AuthServices;

const RecoverStep1Guard: FC<IChildrenProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsChecking(true);
      setHasPermission(false);
      try {
        const data = await processCheckR_stp1();
        Cookies.set('user', JSON.stringify(data), {
          expires: 1 * 24 * 60 * 60 * 1000,
          sameSite: 'Strict',
          path: '/',
          secure: true,
        });
        setHasPermission(true);
      } catch (error) {
        console.error(error);
        setIsChecking(false);
      } finally {
        setIsChecking(false);
      }
    })();
  }, [navigate]);
  if (isChecking) {
    return (
      <div className="flex justify-center bg-neutral-950 items-center min-h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }
  if (!hasPermission && !isChecking) navigate('/recover');
  return <>{children}</>;
};

export default RecoverStep1Guard;
