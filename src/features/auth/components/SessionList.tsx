'use client';

import { TSessionListProps } from '@/features/auth/types/auth-types';
import { SessionCard } from './SessionCard';

/**
 * List component that renders all active sessions
 * Displays each session as a card with device and location information
 * @param sessions - Array of session objects to display
 * @param onRemoveSession - Handler function for removing individual sessions
 */
export function SessionList({ sessions, onRemoveSession }: TSessionListProps) {
  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.sessionId}
          session={session}
          onRemove={onRemoveSession}
        />
      ))}
    </div>
  );
}
