'use client';

import { useQuery } from '@tanstack/react-query';

import { NOTIFICATION_OPTIONS } from '../constants/notification-prams';
import type { ApiResponse } from '@/shared/lib/types/api';
import type { PushStatusResponse } from '../types/notification-types';

interface UsePushStatusOptions {
  enabled?: boolean;
}

export default function usePushStatus({
  enabled = true,
}: UsePushStatusOptions = {}) {
  return useQuery({
    queryKey: NOTIFICATION_OPTIONS.pushStatus,
    queryFn: async () => {
      const response = await fetch('/api/notifications/push-status');
      const data: ApiResponse<PushStatusResponse> =
        await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data.payload;
    },
    enabled,
  });
}
