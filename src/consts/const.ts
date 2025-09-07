import { TNavItem } from '@/types/const.type';
import {
  AiOutlineContacts,
  AiOutlineStar,
  AiOutlineDelete,
} from 'react-icons/ai';
import { MdMergeType } from 'react-icons/md';
import { BiImport } from 'react-icons/bi';

export const navItems: TNavItem[] = [
  {
    path: '/dashboard',
    pathName: 'Contacts',
    icon: AiOutlineContacts,
  },
  {
    path: '/favorite',
    pathName: 'Favorite',
    icon: AiOutlineStar,
  },
  {
    path: '/suggestion',
    pathName: 'Merge & Fix',
    icon: MdMergeType,
  },
  {
    path: null,
    pathName: 'Import',
    icon: BiImport,
  },
  {
    path: '/trash',
    pathName: 'Trash',
    icon: AiOutlineDelete,
  },
];
