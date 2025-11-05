'use client';
import { FC } from 'react';
import ActivityRow from './ActivityRow';
import { useQuery } from '@tanstack/react-query';
import { RetrieveActivity } from '../services/activity-service';
import { groupActivitiesByDate } from '../lib/activity-lib';
import ActivityTableSkeleton from './ActivityTableSkeleton';
import ActivityError from './ActivityError';

const ActivityTable: FC = () => {
  const { isPending, data, error, refetch } = useQuery({
    queryFn: RetrieveActivity,
    queryKey: ['all_activities'],
  });

  if (isPending && !error) return <ActivityTableSkeleton />;
  const activities = groupActivitiesByDate(data);

  if (error && !isPending)
    <ActivityError error={error} onRetry={() => refetch()} />;

  if (!isPending && !error)
    return (
      <div className="flex flex-1 flex-col gap-5 px-4 lg:px-0 pb-4">
        {Object.entries(activities).map(([date, items]) => (
          <div key={date}>
            <h1 className="text-lg font-google-sans mb-6">{date}</h1>
            <div className="flex flex-col gap-3">
              {items.map(({ _id, createdAt, device, location, title }) => (
                <ActivityRow
                  key={_id}
                  _id={_id}
                  createdAt={createdAt}
                  device={device}
                  location={location}
                  title={title}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
};

export default ActivityTable;
