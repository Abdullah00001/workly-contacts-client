import { FC, PropsWithChildren } from 'react';
import CommonHeader from '../components/layout/CommonHeader';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import BackToTopButton from '../components/ui/button/BackToTopButton';

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ScrollToTop />
      <CommonHeader />
      <main id="main-content" className="focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default PublicLayout;
