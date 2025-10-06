'use client';
import { FC, lazy, Suspense, useState } from 'react';
import PersonalInfoPageSkeleton from './PersonalInfoPageSkeleton';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import AccountCenterErrorBoundary from './AccountCenterErrorBoundary';
import { useQuery } from '@tanstack/react-query';
import { GetFullProfileService } from '../services/personal-info-services';

const PersonalInfoSectionHolder: FC = () => {
  const { data, isPending } = useQuery({
    queryFn: async () => await GetFullProfileService(),
    queryKey: ['personal_info'],
  });
  console.log(data);
  return (
    <ErrorBoundary errorComponent={AccountCenterErrorBoundary}>
      {isPending ? (
        <PersonalInfoPageSkeleton />
      ) : (
        <Suspense fallback={<PersonalInfoPageSkeleton />}></Suspense>
      )}
    </ErrorBoundary>
  );
};

export default PersonalInfoSectionHolder;
