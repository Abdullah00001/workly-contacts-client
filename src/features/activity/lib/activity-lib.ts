import { parseISO, format } from 'date-fns';
import { ActivityType, TActivity } from '../types/activity-type';
import {
  CheckCircle2,
  Monitor,
  MapPin,
  Globe,
  Smartphone,
  Calendar,
  Shield,
  AlertCircle,
  XCircle,
  UserPlus,
  KeyRound,
  Lock,
  Unlock,
} from 'lucide-react';

// Group activities by formatted date (e.g., "October 9, 2025")
export const groupActivitiesByDate = (activities: TActivity[]) => {
  const grouped: Record<string, TActivity[]> = {};

  activities.forEach((activity) => {
    const dateKey = format(parseISO(activity.createdAt), 'MMMM d, yyyy');
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(activity);
  });

  return grouped; // e.g., { "October 9, 2025": [activity1, activity2] }
};

// Format activity time for display (e.g., "7:13 AM")
export const formatActivityTime = (iso: string) => {
  return format(parseISO(iso), 'h:mm a');
};

export const activityDetailsFormatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date);
};

export const getActivityIcon = (activityData: ActivityType) => {
  switch (activityData) {
    case ActivityType.LOGIN_SUCCESS:
      return { Icon: CheckCircle2, className: 'h-6 w-6 text-green-600' };
    case ActivityType.LOGIN_FAILED:
      return { Icon: XCircle, className: 'h-6 w-6 text-red-600' };
    case ActivityType.SIGNUP_SUCCESS:
      return { Icon: UserPlus, className: 'h-6 w-6 text-blue-600' };
    case ActivityType.PASSWORD_RESET:
      return { Icon: KeyRound, className: 'h-6 w-6 text-amber-600' };
    case ActivityType.ACCOUNT_LOCKED:
      return { Icon: Lock, className: 'h-6 w-6 text-red-600' };
    case ActivityType.ACCOUNT_ACTIVE:
      return { Icon: Unlock, className: 'h-6 w-6 text-green-600' };
    default:
      return { Icon: Shield, className: 'h-6 w-6 text-primary' };
  }
};

export const getActivityBadgeVariant = (activityData: ActivityType) => {
  switch (activityData) {
    case ActivityType.LOGIN_SUCCESS:
    case ActivityType.SIGNUP_SUCCESS:
    case ActivityType.ACCOUNT_ACTIVE:
      return 'default';
    case ActivityType.LOGIN_FAILED:
    case ActivityType.ACCOUNT_LOCKED:
      return 'destructive';
    case ActivityType.PASSWORD_RESET:
      return 'secondary';
    default:
      return 'secondary';
  }
};

export const getActivityColor = (activityData: ActivityType) => {
  switch (activityData) {
    case ActivityType.LOGIN_SUCCESS:
    case ActivityType.SIGNUP_SUCCESS:
    case ActivityType.ACCOUNT_ACTIVE:
      return 'text-green-600';
    case ActivityType.LOGIN_FAILED:
    case ActivityType.ACCOUNT_LOCKED:
      return 'text-red-600';
    case ActivityType.PASSWORD_RESET:
      return 'text-amber-600';
    default:
      return 'text-primary';
  }
};
