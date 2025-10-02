import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { TDeviceIconProps } from '@/features/auth/types/auth-types';

/**
 * Displays appropriate icon based on device type
 * @param deviceType - Type of device (desktop, mobile, tablet)
 * @param className - Optional CSS classes for styling
 */
export function DeviceIcon({ deviceType, className = '' }: TDeviceIconProps) {
  const iconClass = `w-5 h-5 sm:w-6 sm:h-6 ${className}`;

  switch (deviceType) {
    case 'desktop':
      return <Monitor className={iconClass} />;
    case 'mobile':
      return <Smartphone className={iconClass} />;
    case 'tablet':
      return <Tablet className={iconClass} />;
    default:
      return <Monitor className={iconClass} />;
  }
}
