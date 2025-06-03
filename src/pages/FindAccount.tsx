import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../services/auth.services';
import { findUserSchema } from '../schemas/recover.schemas';
import { IFindUser } from '../interfaces/recover.interfaces';
import { AxiosError } from 'axios';
import { IResponseError } from '../interfaces/error.interfaces';
import { toast, ToastContainer } from 'react-toastify';
import { BarLoader } from 'react-spinners';

const { processFindUser } = AuthServices;

const FindAccount: FC = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState<IFindUser>({ email: '' });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    const result = findUserSchema.safeParse(payload);
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
      await processFindUser(payload);
      toast.success('User Found');
      setTimeout(() => {
        navigate('/recover/identify');
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

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <section className="bg-neutral-950 text-white">
      <ToastContainer position="top-center" />
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="p-3 sm:p-8 sm:border sm:w-[400px] md:w-[500px] rounded-xl w-full">
          <div>
            <h1 className="text-3xl font-extrabold">Find your account</h1>
            <p className="font-semibold mt-4 text-gray-300">
              Enter your email address to find your account and reset your
              password.
            </p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold  mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={payload.email}
                  onChange={(e) => setPayload({ email: e.target.value })}
                  placeholder="Enter your email address"
                  className={`outline-none w-full border rounded-[6px] px-4 py-3 ${
                    fieldErrors.email && 'border-red-500'
                  }`}
                  autoComplete="email"
                  autoFocus
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="w-full cursor-pointer font-bold px-8 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
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
                    'Find Account'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-blue-400 hover:text-blue-500 cursor-pointer font-medium text-sm transition-colors duration-200"
            >
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindAccount;
