'use client';

import { Button } from '@/components/ui/button';
import { TSessionActionsProps } from '@/features/auth/types/auth-types';

/**
 * Action buttons for session management
 * Provides options to remove all other sessions or continue
 * @param onRemoveAll - Handler for removing all non-current sessions
 * @param onContinue - Handler for continuing with current session
 * @param hasOtherSessions - Whether there are sessions other than current to remove
 */
export function SessionActions({
  onRemoveAll,
  onContinue,
  payload,
}: TSessionActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onRemoveAll}
        className="w-full sm:flex-1 cursor-pointer text-sm sm:!text-base !bg-transparent hover:!bg-[#94abfd] "
      >
        Remove All Sessions
      </Button>
      <Button
        disabled={payload.length === 0}
        type="button"
        onClick={onContinue}
        className={`w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-sm sm:text-base cursor-pointer`}
      >
        Continue
      </Button>
    </div>
  );
}
