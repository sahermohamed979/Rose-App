'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { NOTIFICATION_OPTIONS } from '../constants/notification-prams';
import type { ApiResponse } from '@/shared/lib/types/api';
import type { UnreadCountResponse } from '../types/notification-types';

interface UseUnreadCountOptions {
  enabled?: boolean;
}

export default function useUnreadCount({
  enabled = true,
}: UseUnreadCountOptions = {}) {
  // Query client
  const queryClient = useQueryClient();

  // Query
  const query = useQuery({
    queryKey: NOTIFICATION_OPTIONS.unreadCount,
    queryFn: async () => {
      const response = await fetch('/api/notifications/unread-count');
      const data: ApiResponse<UnreadCountResponse> =
        await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data.payload;
    },
    enabled,
    refetchInterval: 30_000,
  });

  // Invalidate the notification list when a new notification arrives
  const previousUnreadCount = useRef(query.data?.unreadCount ?? 0);

  useEffect(() => {
    const unreadCount = query.data?.unreadCount ?? 0;

    if (unreadCount > previousUnreadCount.current) {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_OPTIONS.list(),
      });
    }

    previousUnreadCount.current = unreadCount;
  }, [query.data?.unreadCount, queryClient]);

  return query;
}
