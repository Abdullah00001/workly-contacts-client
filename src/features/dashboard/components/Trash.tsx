'use client';
import EmptyContact from '@/components/common/EmptyContact';
import WorklyLoader from '@/components/common/WorklyLoader';
import { Button } from '@/components/ui/button';
import TrashTable from '@/features/trash/components/TrashTable';
import { RetrieveTrash } from '@/features/trash/services/trash-service';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';

const Trash: FC = () => {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ['trash'],
    queryFn: RetrieveTrash,
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
          Failed to load trash
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
      <div className="px-4">
        <div className="w-full flex items-center justify-start p-1 bg-[#e1e3e1]">
          <div className="py-[10px] pl-5 pr-3">
            <p className="text-[#444746] text-sm font-google-sans-text">
              Contacts that have been in Trash more than 30 days will be deleted
              forever
            </p>
          </div>
          <div className="h-[48px] flex justify-center items-center sm:flex-shrink-0">
            <div className="h-10 flex justify-center items-center">
              <button className="text-sm whitespace-nowrap cursor-pointer hover:bg-[#0b57d012] text-center w-full h-full p-3 rounded-full font-google-sans-text font-medium text-[#0b57d0]">
                Empty Trash now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="pl-2 pt-3 flex gap-2 items-center justify-start">
          <h1 className="font-google-sans text-[#444746] text-2xl font-normal">
            Trash
          </h1>
          <span className="font-google-sans-text text-sm font-medium text-[#444746]">
            {!isPending && `(${data?.length})`}
          </span>
        </div>
        {!isPending && data.length === 0 && <EmptyContact type="contacts" />}
        {!isPending && data.length > 0 && <TrashTable trash={data} />}
      </div>
    </>
  );
};

export default Trash;
