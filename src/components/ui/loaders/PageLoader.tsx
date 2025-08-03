// // src/components/PageLoader.tsx
// import { useIsFetching } from '@tanstack/react-query';
// import { useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { SkeletonPage } from '../skeletons/SkeletonBox';

// export const PageLoader = () => {
//   const isFetching = useIsFetching();
//   const location = useLocation();

//   const [initialLoad, setInitialLoad] = useState(true);

//   // Reset skeleton on route change
//   useEffect(() => {
//     console.log('but not working');
//     setInitialLoad(true);
//   }, [location.pathname]);

//   // Once data is fetched, hide skeleton
//   useEffect(() => {
//     if (initialLoad && isFetching === 0) {
//       setInitialLoad(false);
//     }
//   }, [isFetching, initialLoad]);

//   if (!initialLoad || isFetching === 0) return null;

//   return <SkeletonPage />;
// };

import { useIsFetching } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { SkeletonPage } from '../skeletons/SkeletonBox';

export const PageLoader = () => {
  const isFetching = useIsFetching();
  const location = useLocation();

  const [initialLoad, setInitialLoad] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  // Reset skeleton on route change
  useEffect(() => {
    setInitialLoad(true);
  }, [location.pathname]);

  // Hide skeleton once fetching done, with min delay
  useEffect(() => {
    if (initialLoad && isFetching === 0) {
      // Delay hiding by 300ms to ensure skeleton is visible briefly
      timeoutRef.current = window.setTimeout(() => {
        setInitialLoad(false);
      }, 300);
    }

    // If fetching started again, cancel hiding
    if (isFetching > 0 && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isFetching, initialLoad]);

  if (!initialLoad || isFetching === 0) return null;

  return <SkeletonPage />;
};
