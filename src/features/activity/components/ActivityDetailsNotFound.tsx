'use client';
import { FC } from 'react';
import { FileQuestion } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const ActivityDetailsNotFound: FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12 bg-[#152127]">
      <Card className="max-w-md w-full bg-[#1a2930] border-gray-800">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Activity Not Found
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            This activity doesn{`'`}t exist or may have been deleted. Please
            check the activity ID and try again.
          </p>
          <button
            onClick={() => router.push('/activities')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Back to Activities
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityDetailsNotFound;
