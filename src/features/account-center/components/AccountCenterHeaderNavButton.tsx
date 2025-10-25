'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type AccountCenterHeaderNavButtonProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const AccountCenterHeaderNavButton: FC<AccountCenterHeaderNavButtonProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200',
        'hover:bg-accent active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isActive && 'bg-accent text-accent-foreground font-medium'
      )}
    >
      <Icon
        className={cn(
          'w-5 h-5 flex-shrink-0 transition-colors',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}
      />
      <span className="text-[15px] leading-tight">{label}</span>
    </Link>
  );
};

export default AccountCenterHeaderNavButton;
