'use client';
import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DEFAULT_PAGINATION } from '@/shared/lib/constants/api.constants';
import { NOTIFICATION_OPTIONS } from '../components/notifications/constants/notification-prams';
import { NotificationData } from '../types/notification-types';

export default function UseNotificationList() {
  return useInfiniteQuery({
    queryKey: NOTIFICATION_OPTIONS.list(1, DEFAULT_PAGINATION),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/notification?page=${pageParam}&limit=${DEFAULT_PAGINATION}`
      );
      const data: ApiResponse<IPaginationResponse<NotificationData>> =
        await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }
      return data.payload;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.page === lastPage.metadata.totalPages) {
        return undefined;
      }
      return lastPage.metadata.page + 1;
    },
  });
}
