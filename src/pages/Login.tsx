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
              <h6 className="text-red-500 cursor-pointer font-bold">
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
    </section>
  );
};

export default Login;
