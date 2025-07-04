import { FC, useEffect } from 'react';
import { TTrashContact } from '../interfaces/contacts.interface';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import ContactServices from '../services/contacts.services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TrashTable from '../components/layout/TrashTable';
import { useNavigate } from 'react-router-dom';
import EmptyData from '../components/ui/EmptyData';

const { processGetAllTrashes, processEmptyTrash } = ContactServices;

const Trash: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ['trash'],
    queryFn: async () => await processGetAllTrashes(),
  });
  const { isPending: isEmptyTrashPending, mutate: emptyTrash } = useMutation({
    mutationFn: async () => await processEmptyTrash(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      toast.dismiss();
      toast.success('Trash emptied');
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });
  const contactData: TTrashContact[] = data?.data || [];
  useEffect(() => {
    if (!isEmptyTrashPending) return;
    toast.dismiss();
    toast.info('Working...');
  }, [isEmptyTrashPending]);
  if (contactData.length === 0)
    return <EmptyData type="trash" onCreateContact={() => navigate('/new')} />;
  return (
    <div className="max-w-full">
      <ToastContainer position="top-center" />
      {isPending ? (
        <div className="flex justify-center items-center h-[100vh]">
          <div>
            <ClipLoader
              color="#3B82F6"
              loading={isPending}
              size={50}
              aria-label="Loading contacts"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mt-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-start  justify-between gap-2 bg-[#e1e3e1] p-4 rounded-md w-full">
              <p className="text-[#444746] text-sm md:text-base">
                Contacts that have been in Trash more than 30 days will be
                deleted forever
              </p>
              <button
                onClick={() => emptyTrash()}
                className="text-[#115bd0] font-medium md:px-4 md:py-2 hover:bg-[#d0d8e0] rounded-full w-fit cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:opacity-50"
                disabled={contactData.length === 0}
              >
                Empty Trash now
              </button>
            </div>
          </div>
          <div className="mb-6 mt-3">
            <h1 className="text-2xl pl-2 font-medium">Trash </h1>
          </div>
          <TrashTable contactData={contactData} />
        </>
      )}
    </div>
  );
};

export default Trash;
