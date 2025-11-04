'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-900" />
        ) : (
          <Menu className="w-6 h-6 text-gray-900" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-2 space-y-1">
            <Link
              href="/auth/login"
              onClick={closeMenu}
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium block"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              onClick={closeMenu}
              className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm font-medium block"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
