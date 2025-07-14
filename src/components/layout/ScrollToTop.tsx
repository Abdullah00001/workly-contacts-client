import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top when the pathname changes
    console.log('🔄 Scroll triggered for path:', pathname);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
