import { RetrieveActivityDetails } from '@/features/activity/services/activity-service';
import { TActivityDetailsPageProps } from '@/features/activity/types/activity-type';
import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Monitor,
  MapPin,
  Globe,
  Smartphone,
  Calendar,
  Shield,
  AlertCircle,
} from 'lucide-react';
import {
  activityDetailsFormatDate,
  getActivityBadgeVariant,
  getActivityColor,
  getActivityIcon,
} from '@/features/activity/lib/activity-lib';

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
  const response = await RetrieveActivityDetails(objectId);
  const { data } = response;
  const { Icon, className } = getActivityIcon(data?.activityType);
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

        {/* Main Activity Card */}
        <Card className="mb-4 sm:mb-6 bg-[#1a2930] border-gray-800">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4 w-full">
                <div className="mt-1 shrink-0">
                  <Icon className={className} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle
                    className={`text-lg sm:text-xl lg:text-2xl mb-2 text-balance ${getActivityColor(data?.activityType)}`}
                  >
                    {data?.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-gray-400 break-all">
                    Activity ID: {data?._id}
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant={getActivityBadgeVariant(data?.activityType)}
                className="shrink-0 text-xs sm:text-sm"
              >
                {data?.activityType.replace(/_/g, ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="flex items-start gap-3 p-3 sm:p-4 bg-[#0f1a1f] rounded-lg border border-gray-800">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {data?.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Device & Location Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <Card className="bg-[#1a2930] border-gray-800">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-white">
                <Monitor className="h-4 w-4 sm:h-5 sm:w-5" />
                Device Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-gray-400">
                  Device Type
                </span>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  <span className="font-medium capitalize text-white text-sm sm:text-base">
                    {data?.device}
                  </span>
                </div>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-gray-400">
                  Browser
                </span>
                <span className="font-medium text-white text-sm sm:text-base">
                  {data?.browser}
                </span>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-gray-400">
                  Operating System
                </span>
                <span className="font-medium text-white text-sm sm:text-base">
                  {data?.os}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a2930] border-gray-800">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-white">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-gray-400">
                  Location
                </span>
                <span className="font-medium text-white text-sm sm:text-base">
                  {data?.location}
                </span>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-gray-400">
                  IP Address
                </span>
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  <span className="font-mono text-xs sm:text-sm text-white">
                    {data?.ipAddress}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timestamp Information */}
        <Card className="bg-[#1a2930] border-gray-800">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-white">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">
                Activity Occurred
              </div>
              <div className="font-medium text-white text-sm sm:text-base">
                {activityDetailsFormatDate(data?.createdAt)}
              </div>
            </div>
            <Separator className="bg-gray-800" />
            <div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">
                Last Updated
              </div>
              <div className="font-medium text-white text-sm sm:text-base">
                {activityDetailsFormatDate(data?.updatedAt)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4 sm:mt-6 border-amber-800 bg-amber-950/30">
          <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
            <div className="flex gap-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1 text-amber-100 text-sm sm:text-base">
                  Security Reminder
                </h3>
                <p className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                  If you don{`'`}t recognize this activity, please secure your
                  account immediately by changing your password and reviewing
                  your security settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
