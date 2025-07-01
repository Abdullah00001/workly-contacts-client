import { FC, Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  IBulkTrashPayload,
  TTrashContact,
} from '../../../interfaces/contacts.interface';
import ContactServices from '../../../services/contacts.services';

interface ISingleDeleteModalProps {
  handleIsDelete: () => void;
  selectedItems: string[];
  setContacts: Dispatch<SetStateAction<TTrashContact[]>>;
  setSelectedContacts: Dispatch<SetStateAction<string[]>>;
}

const { processBulkDelete } = ContactServices;

const MultiDeleteModal: FC<ISingleDeleteModalProps> = ({
  handleIsDelete,
  selectedItems,
  setContacts,
  setSelectedContacts,
}) => {
  const queryClient = useQueryClient();
  const { mutate: addBulkTrash, isPending } = useMutation({
    mutationFn: async (payload: IBulkTrashPayload) =>
      await processBulkDelete(payload),
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      setContacts((prev) =>
        prev.filter((item) => !selectedItems.includes(item._id as string))
      );
      setSelectedContacts([]);
      toast.success(`${selectedItems.length} contacts deleted`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const processDelete = () => {
    addBulkTrash({ contactIds: selectedItems });
    handleIsDelete();
  };
  useEffect(() => {
    if (!isPending) return;
    toast.dismiss();
    toast.info('Working...');
  }, [isPending]);
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 flex items-center justify-center p-5 md:p-0"
    >
      <div className="bg-white p-5  rounded-lg md:p-6 md:w-96 shadow-lg">
        <h2 className="text-lg font-semibold">Delete forever?</h2>
        <p className="mt-2 text-gray-600">This can't be undone</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-[14px] bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={handleIsDelete}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-[14px] bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={processDelete}
            disabled={isPending}
          >
            Delete Forever
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiDeleteModal;
