import { LucideIcon } from 'lucide-react';
import { User, Shield } from 'lucide-react';

export type TAccountCenterNavItem = {
  path: string;
  pathName: string;
  icon: LucideIcon;
};

export const AccountCenterNavItems: TAccountCenterNavItem[] = [
  {
    pathName: 'Personal Info',
    path: '/accountscenter',
    icon: User,
  },
  {
    pathName: 'Security & Password',
    path: '/accountscenter/security',
    icon: Shield,
  },
];
