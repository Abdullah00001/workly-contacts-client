import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-neutral-950 text-white">
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="p-4 md:border md:w-[500px] rounded-xl w-full ">
          <div>
            <h1 className="text-3xl font-extrabold">Welcome back :-)</h1>
            <p className="font-semibold mt-4">
              Log in to access your contacts and manage them anytime, anywhere.
            </p>
          </div>
          <div className="mt-6">
            <form>
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="font-bold">
                    Email
                  </label>
                  <input
                    className="outline-none border rounded-[6px] px-3 py-3"
                    type="email"
                    placeholder="Type your Email"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="font-bold">
                    Password
                  </label>
                  <input
                    className="outline-none border rounded-[6px] px-3 py-3"
                    type="password"
                    placeholder="Type your Password"
                  />
                </div>
              </div>

              <div className=" mt-6 w-full">
                <button className="px-8 cursor-pointer rounded-[6px] py-2 w-full bg-blue-500">
                  Sign In
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
                Dont have an account?{" "}
                <span
                  className="font-bold cursor-pointer text-blue-600"
                  onClick={() => navigate("/signup")}
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
