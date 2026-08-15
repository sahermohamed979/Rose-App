export interface NotificationType {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface PushStatusResponse {
  pushConfigured: boolean;
  subscriptionCount: number;
  unreadCount: number;
}

export interface VapidKeyResponse {
  publicKey: string;
}

export interface UnreadCountResponse {
  unreadCount: number;
}

export interface PushSubscriptionInput {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface WebPushSubscription {
  id: string;
  userId: string;
  endpoint: string;
  endpointHash: string;
  p256dh: string;
  auth: string;
  createdAt: string;
  updatedAt: string;
}

export interface PushPayload {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  createdAt: string;
}
