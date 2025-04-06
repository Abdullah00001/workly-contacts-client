import { FC } from "react";

interface ILogoutModalProps {
  handleIsLogout: () => void;
}

const LogoutModal: FC<ILogoutModalProps> = ({ handleIsLogout }) => {
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white p-5 rounded-lg md:p-6 md:w-96 shadow-lg">
        <h2 className="text-lg font-semibold">Logout from your account?</h2>
        <p className="mt-2 text-gray-600">
          You will be logged out of this session. Are you sure you want to log
          out?
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-[14px] cursor-pointer bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handleIsLogout}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-[14px] cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => {
              console.log("Logged out successfully"); // Replace with logout function
              handleIsLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
