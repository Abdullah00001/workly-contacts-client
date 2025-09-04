'use client';
import { FC, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const MobileMenu: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="w-10 h-10" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Button
            variant="outline"
            className="w-full justify-center h-12 text-base font-medium border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors bg-transparent"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link
              href={'/auth/login'}
              className="w-full h-full flex items-center justify-center"
            >
              Login
            </Link>
          </Button>

          <Button
            className="w-full justify-center h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link
              href={'/auth/signup'}
              className="w-full h-full flex items-center justify-center"
            >
              Sign Up
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
