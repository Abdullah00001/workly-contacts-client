import BackToTopButton from '@/components/common/BackToTopButton';
import CommonFooter from '@/components/common/CommonFooter';
import CommonHeader from '@/components/common/CommonHeader';
import TLayout from '@/types/layout.types';

export default function PublicLayout({ children }: TLayout) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <CommonHeader />
      {children}
      <CommonFooter />
      <BackToTopButton />
    </div>
  );
}
