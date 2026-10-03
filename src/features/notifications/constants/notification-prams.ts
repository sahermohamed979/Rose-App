export const NOTIFICATION_OPTIONS = {
  list: (page: number = 1) => ['notification-list', page] as const,
  unreadCount: ['notification-unread-count'] as const,
  pushStatus: ['notification-push-status'] as const,
} as const;
