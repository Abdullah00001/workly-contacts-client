'use client';

import { SessionList } from '@/features/auth/components/SessionList';
import { SessionActions } from '@/features/auth/components/SessionAction';
import { useEffect, useState } from 'react';
import {
  TClearSessionServicePayload,
  TSession,
  TSessionContainerProps,
} from '@/features/auth/types/auth-types';
import { useMutation } from '@tanstack/react-query';
import { ClearSessionService } from '@/features/auth/service/auth-service';

export default function SessionContainer({
  sessionList,
}: TSessionContainerProps) {
  const [sessions, setSessions] = useState<TSession[]>([]);
  const [payload, setPayload] = useState<string[]>([]);
  const { mutate } = useMutation({
    mutationFn: async (payload: TClearSessionServicePayload) =>
      await ClearSessionService(payload),
    onSuccess: (data) => {
      window.location.href = '/dashboard';
    },
  });
  /**
   * Removes a specific session by ID
   * @param sid - Session ID to remove
   */

  const handleRemoveSession = (sid: string) => {
    setSessions((prev) => prev.filter((session) => session.sessionId !== sid));
    setPayload((prev) => [...prev, sid]);
  };

  /**
   * Removes all sessions except the current one
   */
  const handleRemoveAll = () => {
    const allSessions = sessions.map((item) => item.sessionId);
    mutate({ devices: allSessions });
  };

  /**
   * Handles continue action (placeholder for navigation)
   */
  const handleContinue = () => {
    mutate({ devices: payload });
  };
  useEffect(() => {
    setSessions(sessionList);
  }, [sessionList]);
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Active Sessions
      </h2>
      <SessionList sessions={sessions} onRemoveSession={handleRemoveSession} />

      {/* Actions */}
      <SessionActions
        onRemoveAll={handleRemoveAll}
        onContinue={handleContinue}
        payload={payload}
      />
    </div>
  );
}
