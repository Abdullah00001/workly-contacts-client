import CommonHeader from '@/components/common/CommonHeader';
import { SessionAlert } from '@/features/auth/components/SessionAlert';
import SessionContainer from '@/features/auth/components/SessionContainer';
import { checkClearSessionPageAccess } from '@/features/auth/lib/auth-guard';
import { RetrieveSessionsForClearService } from '@/features/auth/service/session-data';
import { TSession } from '@/features/auth/types/auth-types';

export default async function ClearSession() {
  await checkClearSessionPageAccess();
  const { data: sessionList } = await RetrieveSessionsForClearService();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <CommonHeader />
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6">
          <SessionAlert />
          <SessionContainer sessionList={sessionList as TSession[]} />
        </div>
      </main>
    </div>
  );
}
