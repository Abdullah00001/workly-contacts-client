import { User, Shield } from 'lucide-react';

import { LucideIcon } from 'lucide-react';

export interface IAccountCenterNavItem {
  path: string;
  pathName: string;
  icon: LucideIcon;
}

export const AccountCenterNavItems: IAccountCenterNavItem[] = [
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
