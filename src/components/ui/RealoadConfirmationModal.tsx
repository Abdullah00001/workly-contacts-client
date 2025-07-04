import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

const ReloadConfirmationModal: FC<{
  isOpen: boolean;
  onCancel: () => void;
  onContinue: () => void;
  isDeleting: boolean;
}> = ({ isOpen, onCancel, onContinue, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unsaved Changes Detected
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            You have unsaved changes that will be lost if you reload the page.
            Any uploaded images will also be removed.
          </p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onContinue}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isDeleting ? (
                <>
                  <ClipLoader color="#ffffff" size={16} />
                  <span>Cleaning up...</span>
                </>
              ) : (
                <span>Continue Reload</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReloadConfirmationModal;
