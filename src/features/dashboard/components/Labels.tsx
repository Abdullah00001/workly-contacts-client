'use client';
import { TLabels } from '@/features/contact-details/types/type';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { FindContactsByLabel } from '../services/contacts-service';
import WorklyLoader from '@/components/common/WorklyLoader';
import { Button } from '@/components/ui/button';
import ContactTable from '@/components/common/ContactTable';
import EmptyLabel from './EmptyLabel';

const Labels: FC<TLabels> = ({ labelId }) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['contacts', labelId],
    queryFn: async () => await FindContactsByLabel(labelId),
  });
  const labelContacts = data?.labelContacts;
  const labelName = data?.labelName;
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
  return (
    <>
      <div className="pl-2 pt-3 flex gap-2 items-center justify-start">
        <h1 className="font-google-sans text-[#444746] text-2xl font-normal">
          {labelName}
        </h1>
        <span className="font-google-sans-text text-sm font-medium text-[#444746]">
          {!isPending && `(${labelContacts?.length})`}
        </span>
      </div>
      {!isPending && labelContacts.length === 0 && (
        <EmptyLabel type="contacts" />
      )}
      {!isPending && labelContacts.length > 0 && (
        <ContactTable contacts={labelContacts} />
      )}
    </>
  );
};

export default Labels;
