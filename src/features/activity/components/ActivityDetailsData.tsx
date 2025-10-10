'use client';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { RetrieveActivityDetails } from '../services/activity-service';
import ActivityDetailsSkeleton from './ActivityDetailsSkeleton';
import ActivityDetailsError from './ActivityDetailsError';
import ActivityDetails from './ActivityDetails';
import { AxiosError } from 'axios';
import ActivityDetailsNotFound from './ActivityDetailsNotFound';

const ActivityDetailsData: FC<{ objectID: string }> = ({ objectID }) => {
  const { data, error, isPending, refetch } = useQuery({
    queryFn: async () => await RetrieveActivityDetails(objectID),
    queryKey: [`activity_`, objectID],
  });
  if (isPending && !error) return <ActivityDetailsSkeleton />;
  if (!isPending && error) {
    if (error instanceof AxiosError && error.response?.status === 404)
      return <ActivityDetailsNotFound />;
    return <ActivityDetailsError error={error} onRetry={() => refetch()} />;
  }
  if (!isPending && !error && data) return <ActivityDetails data={data} />;
};

export default ActivityDetailsData;
