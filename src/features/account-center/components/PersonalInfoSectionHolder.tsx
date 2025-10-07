'use client';
import { FC, lazy, Suspense } from 'react';
import PersonalInfoPageSkeleton from './PersonalInfoPageSkeleton';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import AccountCenterErrorBoundary from './AccountCenterErrorBoundary';
import { useQuery } from '@tanstack/react-query';
import { GetFullProfileService } from '../services/personal-info-services';

const BasicInfo = lazy(
  () => import('@/features/account-center/components/BasicInfoSection')
);
const ContactInfo = lazy(
  () => import('@/features/account-center/components/ContactInfoSection')
);
const AddressInfo = lazy(
  () => import('@/features/account-center/components/AddressInfoSection')
);

const PersonalInfoSectionHolder: FC = () => {
  const { data, isPending } = useQuery({
    queryFn: async () => await GetFullProfileService(),
    queryKey: ['personal_info'],
  });
  return (
    <ErrorBoundary errorComponent={AccountCenterErrorBoundary}>
      {isPending ? (
        <PersonalInfoPageSkeleton />
      ) : (
        <Suspense fallback={<PersonalInfoPageSkeleton />}>
          <BasicInfo
            avatar={data.avatar}
            dateOfBirth={data.dateOfBirth}
            gender={data.gender}
            name={data.name}
          />
          <ContactInfo email={data.email} phone={data.phone} />
          <AddressInfo home={data.location.home} work={data.location.work} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default PersonalInfoSectionHolder;
