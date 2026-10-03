'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { NOTIFICATION_OPTIONS } from '../constants/notification-prams';
import type { ApiResponse } from '@/shared/lib/types/api';
import {
  getPushSubscription,
  isPushSupported,
  urlBase64ToUint8Array,
} from '../utils/push.util';
import type { VapidKeyResponse } from '../types/notification-types';
import { HEADERS } from '@/shared/lib/constants/api.constants';

export default function usePushSubscription() {
  // Translation
  const t = useTranslations();

  // Query client
  const queryClient = useQueryClient();

  // State
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Effects
  useEffect(() => {
    let active = true;

    async function checkSubscription() {
      if (!isPushSupported()) {
        setIsSubscribed(false);
        setIsChecking(false);
        return;
      }

      const subscription = await getPushSubscription();

      if (!active) {
        return;
      }

      // Re-register an existing browser subscription (upsert after restarts)
      if (subscription) {
        fetch('/api/notifications/subscriptions', {
          method: 'POST',
          headers: { ...HEADERS.jsonBody },
          body: JSON.stringify(subscription.toJSON()),
        }).catch(() => {});
      }

      setIsSubscribed(!!subscription);
      setIsChecking(false);
    }

    checkSubscription();

    return () => {
      active = false;
    };
  }, []);

  // Subscribe mutation
  const subscribeMutation = useMutation({
    mutationFn: async () => {
      if (!isPushSupported()) {
        throw new Error(t('notifications.pushNotSupported'));
      }

      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        throw new Error(t('notifications.pushPermissionDenied'));
      }

      const registration =
        await navigator.serviceWorker.register('/sw.js');

      const vapidResponse = await fetch(
        '/api/notifications/vapid-public-key'
      );
      const vapidData: ApiResponse<VapidKeyResponse> =
        await vapidResponse.json();

      if (!vapidData.status) {
        throw new Error(vapidData.message);
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          vapidData.payload.publicKey
        ),
      });

      const subscribeResponse = await fetch(
        '/api/notifications/subscriptions',
        {
          method: 'POST',
          headers: { ...HEADERS.jsonBody },
          body: JSON.stringify(subscription.toJSON()),
        }
      );
      const subscribeData: ApiResponse<unknown> =
        await subscribeResponse.json();

      if (!subscribeData.status) {
        throw new Error(subscribeData.message);
      }

      setIsSubscribed(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_OPTIONS.pushStatus,
      });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_OPTIONS.list(),
      });
      toast.success(t('notifications.pushEnabled'));
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : t('notifications.pushEnableError')
      );
    },
  });

  // Unsubscribe mutation
  const unsubscribeMutation = useMutation({
    mutationFn: async () => {
      const subscription = await getPushSubscription();

      if (subscription) {
        await fetch('/api/notifications/subscriptions', {
          method: 'DELETE',
          headers: { ...HEADERS.jsonBody },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }

      setIsSubscribed(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_OPTIONS.pushStatus,
      });
      toast.success(t('notifications.pushDisabled'));
    },
    onError: () => {
      toast.error(t('notifications.pushDisableError'));
    },
  });

  return {
    isSubscribed,
    isChecking,
    isSubscribing: subscribeMutation.isPending,
    isUnsubscribing: unsubscribeMutation.isPending,
    subscribe: subscribeMutation.mutate,
    unsubscribe: unsubscribeMutation.mutate,
  };
}
