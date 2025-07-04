import { FC } from 'react';
import ContactTable from '../components/layout/ContactTable';
import { TContacts } from '../interfaces/contacts.interface';
import ContactServices from '../services/contacts.services';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import EmptyData from '../components/ui/EmptyData';
import { useNavigate } from 'react-router-dom';

const { processGetAllContacts } = ContactServices;

const Contacts: FC = () => {
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => await processGetAllContacts(),
  });
  const contactData: TContacts[] = data?.data || [];
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
          {contactData.length === 0 ? (
            <EmptyData
              type="contacts"
              onCreateContact={() => navigate('/new')}
            />
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-medium">
                  Contacts {contactData?.length}
                </h1>
              </div>
              <ContactTable contactData={contactData} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Contacts;
