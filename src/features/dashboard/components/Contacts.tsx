'use client';
import ContactTable from '@/components/common/ContactTable';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { RetrieveContacts } from '../services/contacts-service';
import WorklyLoader from '@/components/common/WorklyLoader';
import EmptyContact from '@/components/common/EmptyContact';
import { Button } from '@/components/ui/button';

const Contacts: FC = () => {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ['contacts'],
    queryFn: RetrieveContacts,
  });
  if (isPending && !error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <WorklyLoader size="medium" text="Loading contacts..." />
        </div>
      </div>
    );
  if (!isPending && error)
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h2 className="font-google-sans text-xl text-[#d32f2f] font-medium">
          Failed to load contacts
        </h2>
        <p className="font-google-sans-text text-sm text-[#5f6368]">
          {error instanceof Error
            ? error.message
            : 'Something went wrong while fetching your contacts.'}
        </p>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="rounded-xl"
        >
          Retry
        </Button>
      </div>
    );
  console.log(data);
  return (
    <>
      <div className="pl-2 pt-3 flex gap-2 items-center justify-start">
        <h1 className="font-google-sans text-[#444746] text-2xl font-normal">
          Contacts
        </h1>
        <span className="font-google-sans-text text-sm font-medium text-[#444746]">
          {!isPending && `(${data?.length})`}
        </span>
      </div>
      {!isPending && data.length === 0 && <EmptyContact type="contacts" />}
      {!isPending && data.length > 0 && <ContactTable contacts={data} />}
    </>
  );
};

export default Contacts;
