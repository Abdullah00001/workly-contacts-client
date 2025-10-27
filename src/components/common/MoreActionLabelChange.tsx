'use client';

import { RetrieveLabels } from '@/features/dashboard/services/label-services';
import { TLabel } from '@/features/dashboard/types/type';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import MoreActionLabelItem from './MoreActionLabelItem';
import { TContacts } from './ContactTable';

export type TMoreActionLabelChange = {
  contact: TContacts;
};

const MoreActionLabelChange: FC<TMoreActionLabelChange> = ({ contact }) => {
  const { data: label } = useQuery({
    queryKey: ['labels'],
    queryFn: RetrieveLabels,
  });
  return (
    <div className="pt-2 w-full">
      <h5 className="px-4 w-full text-[#747776] text-xs font-google-sans-text">
        Change Labels
      </h5>
      <div className="mt-1 max-h-[220px] w-full overflow-auto">
        {(label as TLabel[])?.map((label) => (
          <MoreActionLabelItem
            contact={contact}
            key={label?._id}
            label={label}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreActionLabelChange;
