import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISignupPayload } from "../interfaces/signup.interfaces";
import signupSchema from "../schemas/signup.schemas";
import AuthServices from "../services/auth.services";
import { toast, ToastContainer } from "react-toastify";
import { BarLoader } from "react-spinners";
import { AxiosError } from "axios";
import { IResponseError } from "../interfaces/error.interfaces";

const { processSignup } = AuthServices;

const Signup: FC = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState<ISignupPayload>({
    email: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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
      localStorage.setItem("email", data?.email);
      toast.success("Signup Successful");
      setTimeout(() => {
        navigate("/verify");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        const err = error as AxiosError;
        const message = err.response?.data as IResponseError;
        toast.error(message?.message);
      } else {
        toast.error("Unknown Error Occurred Try Again!");
      }
    } finally {
      setLoading(false);
    }
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
                      fieldErrors.name && "border-red-500"
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
                      fieldErrors.email && "border-red-500"
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
                      fieldErrors.password && "border-red-500"
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
                      !payload.password && "opacity-10 cursor-not-allowed"
                    } ${
                      payload.password && !isPasswordMatched && "border-red-500"
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
                      ? "bg-blue-500 cursor-pointer"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <BarLoader
                      width={150}
                      height={5}
                      color="#fff"
                      cssOverride={{
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  ) : (
                    "Signup"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-2">
            <p>
              Already have an account?{" "}
              <span
                className="font-bold cursor-pointer text-blue-600"
                onClick={() => navigate("/login")}
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
