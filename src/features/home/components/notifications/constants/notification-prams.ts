import { DEFAULT_PAGINATION } from '@/shared/lib/constants/api.constants';

export const NOTIFICATION_OPTIONS = {
  list: (page: number = 1, limit: number = DEFAULT_PAGINATION) =>
    ['notification-list', page, limit] as const,
} as const;
