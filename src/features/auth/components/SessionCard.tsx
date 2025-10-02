'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeviceIcon } from './DeviceIcon';
import { MapPin } from 'lucide-react';
import { TSessionCardProps } from '../types/auth-types';
import { formatRelativeTime } from '@/lib/date-utils';

/**
 * Card component displaying individual session information
 * Shows device details, location, and last activity with remove option
 * @param session - Session object containing device and location data
 * @param onRemove - Handler function for removing the session
 */
export function SessionCard({ session, onRemove }: TSessionCardProps) {
  const handleRemove = () => {
    onRemove(session.sessionId);
  };

  return (
    <Card className="border-2 hover:border-blue-300 transition-colors">
      <CardContent className="p-2 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Device Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-1">
              <DeviceIcon
                deviceType={session.deviceType}
                className="text-blue-600"
              />
            </div>

            <div className="flex-1 min-w-0">
              {/* Browser and OS */}
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                  {session.browser} - {session.os}
                </h3>
              </div>

              {/* Last Active */}
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Last active: {formatRelativeTime(session.lastUsedAt)}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1 mt-2 text-xs sm:text-sm text-gray-500">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-words">{session.location}</span>
              </div>
            </div>
          </div>

          {/* Remove Button */}
          <div className="flex-shrink-0 sm:ml-4">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="w-full sm:w-auto text-xs sm:text-sm cursor-pointer"
            >
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
