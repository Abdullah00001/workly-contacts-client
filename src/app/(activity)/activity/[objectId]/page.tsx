import ActivityDetailsData from '@/features/activity/components/ActivityDetailsData';
import { TActivityDetailsPageProps } from '@/features/activity/types/activity-type';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity Details | Workly Contacts',
  description:
    'View detailed insights about your recent account activities in Workly Contacts. Track login events, security changes, and other important account actions for better security awareness.',
  keywords: [
    'Workly Contacts activity',
    'account activity details',
    'login history',
    'security logs',
    'recent account actions',
    'user activity tracking',
    'Workly Contacts security',
  ],
  openGraph: {
    title: 'Activity Details',
    description:
      'Explore your recent account activity in Workly Contacts. Stay informed about logins, password changes, and other key actions to keep your account secure.',
    url: 'https://contacts.workly.ink/account/activity-details',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Activity Details | Workly Contacts',
    description:
      'Check your latest activity logs on Workly Contacts. Review login sessions and security events to ensure your account’s safety.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ActivityDetails({
  params,
}: TActivityDetailsPageProps) {
  const { objectId } = await params;
  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="w-full px-4 sm:px-6 py-6 sm:py-8 lg:w-[870px] mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-balance text-white">
            Activity Details
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
            Review detailed information about this account activity
          </p>
        </div>
        <ActivityDetailsData objectID={objectId} />
      </div>
    </div>
  );
}
