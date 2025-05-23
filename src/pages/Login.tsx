import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginPayload } from '../interfaces/login.interfaces';
import { BarLoader } from 'react-spinners';
import AuthServices from '../services/auth.services';
import loginSchema from '../schemas/login.schemas';
import { AxiosError } from 'axios';
import { IResponseError } from '../interfaces/error.interfaces';
import { toast, ToastContainer } from 'react-toastify';
import useAuthContext from '../hooks/useAuthContext';

const { processLogin } = AuthServices;

const Login: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [payload, setPayload] = useState<ILoginPayload>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    const result = loginSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          const fieldName = err.path[0];
          fieldErrors[fieldName] = err.message;
        }
      });
      setFieldErrors(fieldErrors);
      setLoading(false);
      return;
    }
    try {
      await processLogin(payload);
      toast.success('Login Successful');
      setUser(true);
      setTimeout(() => {
        navigate('/');
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
  const [showForgotPasswordModal, setShowForgotPasswordModal] =
    useState<boolean>(false);
  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
  };

  const closeModal = () => {
    setShowForgotPasswordModal(false);
  };
  return (
    <section className="bg-neutral-950 text-white">
      <ToastContainer position="top-center" />
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="p-4 md:border md:w-[500px] rounded-xl w-full ">
          <div>
            <h1 className="text-3xl font-extrabold">Welcome back :-)</h1>
            <p className="font-semibold mt-4">
              Log in to access your contacts and manage them anytime, anywhere.
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="font-bold">
                    Email
                  </label>
                  <input
                    className={`outline-none border rounded-[6px] px-3 py-3 ${
                      fieldErrors.email && 'border-red-500'
                    }`}
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChangeField}
                    placeholder="Type your Email"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="font-bold">
                    Password
                  </label>
                  <input
                    className={`outline-none border rounded-[6px] px-3 py-3 ${
                      fieldErrors.password && 'border-red-500'
                    }`}
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChangeField}
                    placeholder="Type your Password"
                  />
                  {fieldErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className=" mt-6 w-full">
                <button
                  type="submit"
                  className={`w-full font-bold px-8 rounded-[6px] py-2 bg-blue-500 cursor-pointer`}
                >
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
                    'Sign In'
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col mt-4">
            <div>
              <h6
                onClick={handleForgotPasswordClick}
                className="text-red-500 cursor-pointer font-bold"
              >
                Forgot Password
              </h6>
            </div>
            <div>
              <p className="text-gray-300">
                Dont have an account?{' '}
                <span
                  className="font-bold cursor-pointer text-blue-600"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl p-6 w-full max-w-md mx-auto border border-neutral-700 shadow-2xl transform transition-all duration-300 ease-out scale-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Password Recovery
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-neutral-800"
              >
                <svg
                  className="w-5 h-5"
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
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 mb-4 border border-blue-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Feature Coming Soon!
                    </h3>
                    <p className="text-gray-300 text-sm">
                      We're working on password recovery
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                Our password recovery feature is currently under development.
                We're building a secure and user-friendly solution that will
                include:
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Email-based password reset
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Two-factor authentication
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Security questions backup
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-gray-400 text-sm">
                In the meantime, please contact our support team if you need
                assistance accessing your account.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                >
                  Got it!
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    // You can add navigation to support/contact page here
                    toast.info('Support contact feature coming soon!');
                  }}
                  className="flex-1 bg-neutral-800 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-600"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
