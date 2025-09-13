'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const Breadcrumb: FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // current path
  const pathSegments = pathname.split('/').filter(Boolean); // split and remove empty

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <button
          onClick={handleBack}
          className="flex cursor-pointer items-center space-x-1 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {pathSegments.map((segment, idx) => {
          const href = '/' + pathSegments.slice(0, idx + 1).join('/');
          const isLast = idx === pathSegments.length - 1;
          return (
            <span key={href} className="flex items-center">
              <span className="text-gray-400 mx-1">/</span>
              {isLast ? (
                <span className="text-gray-800 font-medium">
                  {decodeURIComponent(segment.replace(/-/g, ' '))}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {decodeURIComponent(segment.replace(/-/g, ' '))}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
