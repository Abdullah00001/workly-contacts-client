import { UseMutateFunction } from '@tanstack/react-query';
import { FC } from 'react';

interface ISingleDeleteModalProps {
  handleIsDelete: () => void;
  singleTrash: UseMutateFunction;
}

const SingleDeleteModal: FC<ISingleDeleteModalProps> = ({
  handleIsDelete,
  singleTrash,
}) => {
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white p-5  rounded-lg md:p-6 md:w-96 shadow-lg">
        <h2 className="text-lg font-semibold">Delete from contacts?</h2>
        <p className="mt-2 text-gray-600">
          This contact will be permanently deleted from this account after 30
          days.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-[14px] bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handleIsDelete}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-[14px] bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => {
              singleTrash();
              handleIsDelete();
            }}
          >
            Move To Trash
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleDeleteModal;
