'use client';

import { BellRing, BellOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import usePushSubscription from '../hooks/use-push-subscription';

export default function PushNotificationBanner() {
  // Translation
  const t = useTranslations();

  // Hooks
  const {
    isSubscribed,
    isChecking,
    isSubscribing,
    isUnsubscribing,
    subscribe,
    unsubscribe,
  } = usePushSubscription();

  if (isChecking) {
    return <div className="h-10 animate-pulse bg-bg-soft" />;
  }

  return (
    <div className="flex flex-col gap-2 border-t border-border-soft p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isSubscribed ? (
            <BellRing size={18} className="text-bg-primary" />
          ) : (
            <BellOff size={18} className="text-text-soft" />
          )}
          <span className="text-xs font-semibold text-text-plain">
            {isSubscribed
              ? t('notifications.pushEnabledTitle')
              : t('notifications.pushTitle')}
          </span>
        </div>

        <Button
          size="xs"
          variant={isSubscribed ? 'outline' : 'default'}
          disabled={isSubscribing || isUnsubscribing}
          onClick={() => (isSubscribed ? unsubscribe() : subscribe())}
        >
          {isSubscribed
            ? t('notifications.pushDisable')
            : t('notifications.pushEnable')}
        </Button>
      </div>
    </div>
  );
}
