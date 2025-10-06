'use client';
import { FC } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

type TAccountCenterErrorBoundary = {
  error: Error;
  reset?: () => void;
};

const AccountCenterErrorBoundary: FC<TAccountCenterErrorBoundary> = ({
  error,
  reset,
}) => {
  const handleRetry = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="w-full min-h-[400px] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-900/30 p-3 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-white mb-2">
            Something Went Wrong
          </h2>

          <p className="text-gray-300 text-sm mb-4">
            We encountered an error while loading your personal information.
            Please try again.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-900/50 border border-gray-700 rounded p-3 mb-4 text-left">
              <p className="text-xs text-gray-400 font-mono break-words">
                {error.message}
              </p>
            </div>
          )}

          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCenterErrorBoundary;
