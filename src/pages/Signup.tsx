import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISignupPayload } from '../interfaces/signup.interfaces';
import signupSchema from '../schemas/signup.schemas';
import AuthServices from '../services/auth.services';
import { toast, ToastContainer } from 'react-toastify';
import { BarLoader } from 'react-spinners';
import { AxiosError } from 'axios';
import { IResponseError } from '../interfaces/error.interfaces';
import Cookies from 'js-cookie';
import AES from 'crypto-js/aes';
import env from '../configs/env.configs';

const { processSignup } = AuthServices;
const { VU_E_SECRET, BASE_URL } = env;

const Signup: FC = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState<ISignupPayload>({
    email: '',
    name: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(false);
  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const handleConfirmPasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    const result = signupSchema.safeParse(payload);
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
      const data = await processSignup(payload);
      const hashed = AES.encrypt(data?.email, VU_E_SECRET).toString();
      Cookies.set('v_ue', hashed, {
        path: '/',
        expires: 1,
        secure: window.location.protocol === 'https',
        sameSite: 'Strict',
      });
      toast.success('Signup Successful');
      setTimeout(() => {
        navigate('/verify');
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
  const handleGoogleSignUp = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };
  useEffect(() => {
    if (payload.password) {
      const password = payload.password;
      setIsPasswordMatched(password === confirmPassword);
    } else {
      return;
    }
  }, [confirmPassword, payload.password]);
  return (
    <section className="bg-neutral-950 text-white">
      <ToastContainer position="top-center" />
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="p-4 md:border md:w-[600px] rounded-xl w-full ">
          <div>
            <h1 className="text-3xl font-extrabold">Create your account</h1>
            <p className="font-semibold mt-4">
              A smarter way to save, sync, and manage your personal connections.
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="font-bold">
                    Name
                  </label>
                  <input
                    className={`outline-none border rounded-[6px] px-3 py-3 ${
                      fieldErrors.name && 'border-red-500'
                    }`}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Type your full name"
                    onChange={handleChangeField}
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="font-bold">
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
                  <label htmlFor="password" className="font-bold">
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
                <div className="flex flex-col gap-3">
                  <label htmlFor="confirmPassword" className="font-bold">
                    Confirm Password
                  </label>
                  <input
                    disabled={!payload.password}
                    className={`outline-none border rounded-[6px] px-3 py-3 ${
                      !payload.password && 'opacity-10 cursor-not-allowed'
                    } ${
                      payload.password && !isPasswordMatched && 'border-red-500'
                    }`}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleConfirmPasswordField}
                    placeholder="Type your Password"
                  />
                </div>
              </div>
              <div className=" mt-6">
                <button
                  type="submit"
                  disabled={!isPasswordMatched || loading}
                  className={`w-full font-bold px-8 rounded-[6px] py-2 ${
                    isPasswordMatched
                      ? 'bg-blue-500 cursor-pointer'
                      : 'bg-gray-500 cursor-not-allowed'
                  }`}
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
                    'Signup'
                  )}
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>
            <div className="mt-4 w-full">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full font-bold px-8 rounded-[6px] py-2 bg-white text-black hover:bg-gray-100 cursor-pointer flex items-center justify-center gap-2 border"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
          <div className="mt-2">
            <p>
              Already have an account?{' '}
              <span
                className="font-bold cursor-pointer text-blue-600"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
