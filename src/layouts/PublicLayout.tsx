import { FC, PropsWithChildren } from 'react';
import CommonHeader from '../components/layout/CommonHeader';
import Footer from '../components/layout/Footer';

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <CommonHeader />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
