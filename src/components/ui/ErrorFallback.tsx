// components/common/ErrorFallback.tsx
import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full text-center border border-red-200">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-red-500 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
