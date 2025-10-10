'use client';
import { FC } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ActivityDetailsError: FC<{ error: Error; onRetry: () => void }> = ({
  error,
  onRetry,
}) => (
  <div className="flex flex-1 items-center justify-center px-4 py-12">
    <Card className="max-w-md w-full bg-[#1a2930] border-red-800">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Failed to load activity details
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          {error.message ||
            'An error occurred while fetching activity information.'}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Try Again
        </button>
      </CardContent>
    </Card>
  </div>
);

export default ActivityDetailsError;
