import { FC, useState } from "react";

interface IDeleteAccountModalProps {
  handleIsDeleteAccount: () => void;
}

const DeleteAccountModal: FC<IDeleteAccountModalProps> = ({
  handleIsDeleteAccount,
}) => {
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = () => {
    if (confirmationText === "CONFIRM") {
      console.log("Account deleted"); // Replace with account delete function
      handleIsDeleteAccount();
    } else {
      alert("Please type 'CONFIRM' to proceed.");
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white p-5 rounded-lg md:p-6 md:w-96 shadow-lg">
        <h2 className="text-lg font-semibold">Delete Your Account?</h2>
        <p className="mt-2 text-gray-600">
          This action is permanent. Once your account is deleted, you will lose
          all your data and cannot recover it.
        </p>
        <div className="mt-4">
          <label className="block text-gray-700">
            Type "CONFIRM" to proceed
          </label>
          <input
            type="text"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-[14px] bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handleIsDeleteAccount}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-[14px] bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
