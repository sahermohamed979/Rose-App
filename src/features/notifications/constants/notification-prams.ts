export const NOTIFICATION_OPTIONS = {
  list: (page: number = 1) => ['notification-list', page] as const,
} as const;
