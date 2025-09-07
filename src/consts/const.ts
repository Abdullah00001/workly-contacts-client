import { TNavItem } from '@/types/const.type';
import {
  AiOutlineContacts,
  AiOutlineStar,
  AiOutlineDelete,
} from 'react-icons/ai';

export const navItems: TNavItem[] = [
  {
    path: '/',
    pathName: 'Contacts',
    icon: AiOutlineContacts,
  },
  {
    path: '/favorite',
    pathName: 'Favorite',
    icon: AiOutlineStar,
  },
  {
    path: '/trash',
    pathName: 'Trash',
    icon: AiOutlineDelete,
  },
];
