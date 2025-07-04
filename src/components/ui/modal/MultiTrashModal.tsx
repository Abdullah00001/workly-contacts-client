import { FC, Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ContactServices from '../../../services/contacts.services';
import {
  IBulkTrashPayload,
  TContacts,
} from '../../../interfaces/contacts.interface';
interface ISingleDeleteModalProps {
  handleIsDelete: () => void;
  selectedItems: string[];
  setContacts: Dispatch<SetStateAction<TContacts[]>>;
  setSelectedContacts: Dispatch<SetStateAction<string[]>>;
}

const { processBulkTrash } = ContactServices;

const MultiTrashModal: FC<ISingleDeleteModalProps> = ({
  handleIsDelete,
  selectedItems,
  setContacts,
  setSelectedContacts,
}) => {
  const queryClient = useQueryClient();
  const { mutate: addBulkTrash, isPending } = useMutation({
    mutationFn: async (payload: IBulkTrashPayload) =>
      await processBulkTrash(payload),
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      selectedItems.forEach((item) =>
        queryClient.invalidateQueries({ queryKey: ['contact', item] })
      );
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      setContacts((prev) =>
        prev.filter((item) => !selectedItems.includes(item._id as string))
      );
      setSelectedContacts([]);
      toast.success(`${selectedItems.length} add to trash`);
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
        <h2 className="text-lg font-semibold">Delete selected contacts?</h2>
        <p className="mt-2 text-gray-600">
          These contacts will be permanently deleted from this account after 30
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
            onClick={processDelete}
            disabled={isPending}
          >
            Move To Trash
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiTrashModal;
