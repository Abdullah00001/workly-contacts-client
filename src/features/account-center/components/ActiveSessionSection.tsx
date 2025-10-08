'use client';

import { FC } from 'react';
import {
  TActiveSessionSectionProps,
  TRemoveSession,
} from '../types/personal-info-types';
import { getRelativeTimeFromNow } from '@/lib/date-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogoutService } from '@/features/auth/service/auth-service';
import { RemoveSession } from '../services/personal-info-services';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';

const ActiveSessionsSection: FC<TActiveSessionSectionProps> = ({
  sessions,
}) => {
  const queryClient = useQueryClient();
  const { isPending: currentDeviceLogoutPending, mutate: currentDeviceLogout } =
    useMutation({
      mutationFn: async () => await LogoutService(),
      onSuccess: (data) => {
        window.location.href = '/';
      },
    });
  const { isPending: isRemoveSessionPending, mutate: removeSession } =
    useMutation({
      mutationFn: async (payload: TRemoveSession) =>
        await RemoveSession(payload),
      onSuccess: (data) => {
        queryClient.setQueryData(['active_sessions'], data);
        toast.success('Session Removed', { closeButton: false });
      },
      onError: (error) => {
        console.log(error.message);
        toast.error('Session Remove Failed, Try Again!', {
          closeButton: false,
        });
      },
    });
  const isLoading = currentDeviceLogoutPending || isRemoveSessionPending;
  const handleRemove = ({
    currentSession,
    sid,
  }: {
    currentSession: boolean;
    sid: string;
  }) => {
    if (currentSession) currentDeviceLogout();
    else removeSession({ sessionId: sid });
  };
  return (
    <div className="w-full  mt-4 mb-4 border border-gray-500 p-4 rounded-[8px]">
      <h5 className="font-medium text-[16px]">Active Sessions</h5>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                OS
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Browser
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Location
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Last Use
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1 px-4"></td>
              <td className="py-1 px-4"></td>
              <td className="py-1 px-4"></td>
            </tr>
            {sessions.map(
              ({
                browser,
                lastUsedAt,
                location,
                os,
                currentSession,
                sessionId,
              }) => (
                <tr
                  key={sessionId}
                  className={`${currentSession ? 'bg-emerald-600/40' : 'bg-gray-50/4'} cursor-pointer hover:bg-gray-50/15 transition-colors`}
                >
                  <td className="py-3 px-4 text-white">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{os}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white">
                    <div className="flex items-center">
                      <span className="text-sm">{browser}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white text-sm">{location}</td>
                  <td className="py-3 px-4 text-white text-sm">
                    {getRelativeTimeFromNow(lastUsedAt)}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        handleRemove({
                          currentSession: currentSession as boolean,
                          sid: sessionId,
                        })
                      }
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 px-3 cursor-pointer rounded transition-colors"
                    >
                      {isLoading ? 'Processing...' : 'Logout'}
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveSessionsSection;
