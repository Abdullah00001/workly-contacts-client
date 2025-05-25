import { FC, useEffect, useState } from 'react';
import { IFoundUser } from '../interfaces/recover.interfaces';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../services/auth.services';
import { toast, ToastContainer } from 'react-toastify';
import { AxiosError } from 'axios';
import { IResponseError } from '../interfaces/error.interfaces';
import { BarLoader } from 'react-spinners';

const { processSentOtp } = AuthServices;

const FoundAndSentOtp: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<IFoundUser>({
    avatar: null,
    email: '',
    isVerified: false,
    name: '',
    userId: '',
  });

  const handleConfirmUser = async () => {
    setLoading(true);
    try {
      await processSentOtp();
      toast.success('User Found');
      setTimeout(() => {
        navigate('/recover/verify');
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        const err = error as AxiosError;
        const message = err.response?.data as IResponseError;
        toast.error(message?.message);
      } else {
        toast.error('Unknown Error Occurred Try Again!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNotMyAccount = () => {
    navigate('/recover');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const cookie = Cookies.get('r_stp1');
    const decoded: IFoundUser = jwtDecode(cookie as string);
    setFoundUser({ ...decoded });
  }, []);

  return (
    <section className="bg-neutral-950 text-white">
      <ToastContainer position="top-center" />
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="p-3 sm:p-8 sm:border sm:w-[400px] md:w-[500px] rounded-xl w-full">
          <div>
            <h1 className="text-3xl font-extrabold">Is this your account?</h1>
            <p className="font-semibold mt-4 text-gray-300">
              We found an account matching your email. Please confirm if this is
              your account to receive a verification code.
            </p>
          </div>

          <div className="mt-8 mb-8">
            {/* User Info Card */}
            <div className="bg-neutral-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  <img
                    src={
                      foundUser.avatar
                        ? foundUser.avatar
                        : `https://api.dicebear.com/7.x/initials/svg?seed=${foundUser.name}`
                    }
                    alt="Avatar"
                    className="rounded-full"
                  />
                </div>

                {/* User Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    {foundUser.name}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-gray-300">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">{foundUser.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleConfirmUser}
              className="w-full font-bold cursor-pointer px-8 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {loading ? (
                <BarLoader
                  width={150}
                  height={5}
                  color="#fff"
                  cssOverride={{
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              ) : (
                'Yes, this is my account'
              )}
            </button>

            <button
              type="button"
              onClick={handleNotMyAccount}
              className="w-full cursor-pointer font-medium px-8 py-3 border border-gray-600 text-gray-300 rounded-md hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              No, this is not my account
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-neutral-900 border border-gray-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-300">
                  If you confirm this is your account, we'll send a verification
                  code to your email address to reset your password.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-blue-400 cursor-pointer hover:text-blue-500 font-medium text-sm transition-colors duration-200"
            >
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundAndSentOtp;
