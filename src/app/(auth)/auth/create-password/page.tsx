import CommonHeader from '@/components/common/CommonHeader';
import CreatePasswordClient from '@/features/auth/components/CreatePasswordClient';

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <CommonHeader />
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <CreatePasswordClient />
      </main>
    </div>
  );
}
