import { Home, LucideIcon } from 'lucide-react';
import { User, Shield } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

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

export type TAccountCenterHeaderSheetProps = {
  isSheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
};

export const AccountCenterHeaderNavItems = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: User,
    label: 'Personal Info',
    href: '/accountscenter',
  },
  {
    icon: Shield,
    label: 'Security And Password',
    href: '/accountscenter/security',
  },
];
