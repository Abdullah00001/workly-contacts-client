import { FC } from 'react';
import AuthServices from '../../services/auth.services';
import { toast } from 'react-toastify';
import useAuthContext from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

interface ILogoutModalProps {
  handleIsLogout: () => void;
}
const { processLogout } = AuthServices;
const LogoutModal: FC<ILogoutModalProps> = ({ handleIsLogout }) => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const handleLogout = async () => {
    try {
      await processLogout();
      toast.success('Logout Successful');
      setUser(false);
      handleIsLogout();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      handleIsLogout();
      if (error instanceof Error) {
        toast.error('Logout Failed');
      } else {
        toast.error('Unknown Error Occurred');
      }
    }
  };
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white p-5 rounded-lg md:p-6 md:w-96 shadow-lg">
        <h2 className="text-lg font-semibold">Logout from your account?</h2>
        <p className="mt-2 text-gray-600">
          You will be logged out of this session. Are you sure you want to log
          out?
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-[14px] cursor-pointer bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handleIsLogout}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-[14px] cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
