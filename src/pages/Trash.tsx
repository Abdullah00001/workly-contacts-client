import { FC } from 'react';
import { TTrashContact } from '../interfaces/contacts.interface';
import { ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import ContactServices from '../services/contacts.services';
import { useQuery } from '@tanstack/react-query';
import TrashTable from '../components/layout/TrashTable';

const { processGetAllTrashes } = ContactServices;

const Trash: FC = () => {
  const { data, isPending } = useQuery({
    queryKey: ['trash'],
    queryFn: async () => await processGetAllTrashes(),
  });
  const contactData: TTrashContact[] = data?.data || [];
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
              <button className="text-[#115bd0] font-medium md:px-4 md:py-2 hover:bg-[#d0d8e0] rounded-full w-fit">
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
