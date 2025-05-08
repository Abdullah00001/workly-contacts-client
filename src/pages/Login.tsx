import { FC } from "react";
import Input from "../components/ui/Input";

const Login: FC = () => {
  return (
    <section>
      <div className="w-full flex justify-center items-center h-screen">
        <div className="w-[700px] rounded-[16px] border-t-[1px] rounded-r-none rounded-b-none  border-l-[1px] border-white p-[30px]">
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome Back, Explorer!</h1>
            <p className="text-xl font-medium mb-6">
              The world of PostBook is waiting for your next post.
            </p>
          </div>
          <div className="mt-6">
            <form>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="email " className={`${pl} text-xl`}>
                      Email
                    </label>
                    <Input
                      type={"email"}
                      id={"email"}
                      name={"email"}
                      placeholder={"Please Type Your Email"}
                      className={
                        "outline-none p-[15px] bg-accent placeholder-gray-100 border-none rounded-[16px]"
                      }
                    />
                  </div>
                </div>
                <div>
                  <input type="text" />
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <span className="text-lg inline-block font-semibold text-blue-500 pr-3  cursor-pointer">
                  Forgot Password!
                </span>
              </div>
            </form>
          </div>
          <p className="text-gray-200 font-normal text-[15px] mt-[14px] pl-[3px]">
            Not a member yet?{" "}
            <span className="cursor-pointer font-bold">Sign Up</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
