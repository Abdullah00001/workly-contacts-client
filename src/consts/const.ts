import { TNavItem } from '@/types/const.type';

export const navItems: TNavItem[] = [
  {
    path: '/dashboard',
    pathName: 'Contacts',
    icon: {
      name: 'person',
      variant: 'filled',
      className: 'text-[#444746]',
      type: 'icons',
      size: 24,
    },
  },
  {
    path: '/favorite',
    pathName: 'Favorite',
    icon: {
      name: 'star',
      variant: 'filled',
      className: 'text-[#444746]',
      type: 'icons',
      size: 24,
    },
  },
  {
    path: '/suggestion',
    pathName: 'Merge & Fix',
    icon: {
      name: 'handyman',
      variant: 'outlined',
      className: 'text-[#444746]',
      type: 'icons',
      size: 24,
    },
  },
  {
    path: null,
    pathName: 'Import',
    icon: {
      name: 'download',
      variant: 'outlined',
      className: 'text-[#444746]',
      type: 'symbols',
      size: 24,
    },
  },
  {
    path: '/trash',
    pathName: 'Trash',
    icon: {
      name: 'delete',
      variant: 'outlined',
      className: 'text-[#444746]',
      type: 'symbols',
      size: 24,
    },
  },
];
