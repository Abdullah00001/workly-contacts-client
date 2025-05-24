import { FC } from 'react';

const FoundAndSentOtp: FC = () => {
  // Mock user data - replace with props or API data
  const foundUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'JD', // You can use initials or image URL
  };

  const handleConfirmUser = () => {
    console.log('User confirmed - send OTP');
    // TODO: Add logic to send OTP and navigate to OTP verification page
  };

  const handleNotMyAccount = () => {
    console.log("Not user's account - go back to find user page");
    // TODO: Add navigation logic to go back to find user page
  };

  const handleBackToLogin = () => {
    console.log('Navigate back to login');
    // TODO: Add navigation logic here
  };

  return (
    <section className="bg-neutral-950 text-white">
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
                  {foundUser.avatar}
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
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">{foundUser.phone}</span>
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
              className="w-full font-bold px-8 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
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
              Yes, this is my account
            </button>

            <button
              type="button"
              onClick={handleNotMyAccount}
              className="w-full font-medium px-8 py-3 border border-gray-600 text-gray-300 rounded-md hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center"
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

export default FoundAndSentOtp;
