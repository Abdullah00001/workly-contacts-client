import { FC, FormEvent, useState } from "react";

const FindAccount: FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Find user with email:", email);
    // TODO: Add your business logic here
  };

  const handleBackToLogin = () => {
    console.log("Navigate back to login");
    // TODO: Add navigation logic here
  };

  return (
    <section className="bg-neutral-950 text-white">
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="p-3 sm:p-8 sm:border sm:w-[400px] md:w-[500px] rounded-xl w-full">
          <div>
            <h1 className="text-3xl font-extrabold">Find your account</h1>
            <p className="font-semibold mt-4 text-gray-300">
              Enter your email address to find your account and reset your password.
            </p>
          </div>
          
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 text-white bg-neutral-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  autoComplete="email"
                  autoFocus
                />
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full font-bold px-8 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Find Account
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-blue-400 hover:text-blue-500 font-medium text-sm transition-colors duration-200"
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