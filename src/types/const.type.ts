import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

export type TNavItem ={
  path: string|null;
  pathName: string;
  icon: IconType;
}
