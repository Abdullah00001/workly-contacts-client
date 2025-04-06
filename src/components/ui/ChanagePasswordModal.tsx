import { FC, useState } from "react";

interface IChangePasswordModalProps {
  handleIsChangePassword: () => void;
}

const ChangePasswordModal: FC<IChangePasswordModalProps> = ({
  handleIsChangePassword,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  const handleSubmit = () => {
    console.log("Password changed"); // Replace with password change function
    handleIsChangePassword();
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white p-5 rounded-lg md:p-6 md:w-96 shadow-lg">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <div className="mt-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Retype New Password</label>
          <input
            type="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            value={retypeNewPassword}
            onChange={(e) => setRetypeNewPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-[14px] bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handleIsChangePassword}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-[14px] bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
