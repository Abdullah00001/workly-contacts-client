import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * Alert component displaying session limit warning
 * Shows when maximum number of devices has been reached
 */
export function SessionAlert() {
  return (
    <Alert className="border-amber-200 bg-amber-50 text-amber-900">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-base sm:text-lg font-semibold">
        🔒 Session Limit Reached
      </AlertTitle>
      <AlertDescription className="text-sm sm:text-base">
        You&apos;ve reached the maximum number of devices. Please remove one to
        continue.
      </AlertDescription>
    </Alert>
  );
}
