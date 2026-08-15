import type { PushSubscriptionInput } from '../types/notification-types';

interface StoredSubscription extends PushSubscriptionInput {
  userId: string;
  createdAt: string;
}

const subscriptions = new Map<string, StoredSubscription>();

// get all subscriptions for a user
export function getSubscriptions(
  userId: string
): StoredSubscription[] {
  return Array.from(subscriptions.values()).filter(
    (subscription) => subscription.userId === userId
  );
}

// upsert a subscription by endpoint
export function addSubscription(
  userId: string,
  subscription: PushSubscriptionInput
): void {
  subscriptions.set(subscription.endpoint, {
    ...subscription,
    userId,
    createdAt: new Date().toISOString(),
  });
}

// remove a subscription by endpoint
export function removeSubscription(endpoint: string): void {
  subscriptions.delete(endpoint);
}

// count subscriptions for a user
export function countSubscriptions(userId: string): number {
  return getSubscriptions(userId).length;
}
