import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Signup: FC = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-neutral-950 text-white">
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="p-4 md:border md:w-[500px] rounded-xl w-full ">
          <div>
            <h1 className="text-3xl font-extrabold">Create your account</h1>
            <p className="font-semibold mt-4">
              A smarter way to save, sync, and manage your personal connections.
            </p>
          </div>
          <div className="mt-6">
            <form>
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="font-bold">
                    Name
                  </label>
                  <input
                    className="outline-none border rounded-[6px] px-3 py-3"
                    type="text"
                    placeholder="Type your full name"
                  />
                </div>
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
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="font-bold">
                    Confirm Password
                  </label>
                  <input
                    className="outline-none border rounded-[6px] px-3 py-3"
                    type="password"
                    placeholder="Type your Password"
                  />
                </div>
              </div>
              <div className=" mt-6">
                <button
                  type="submit"
                  className="w-full font-bold cursor-pointer px-8 rounded-[6px] py-2 bg-blue-500"
                >
                  Sign Up
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
