export function urlBase64ToUint8Array(
  base64String: string
): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const bytes = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    bytes[i] = rawData.charCodeAt(i);
  }

  return bytes;
}

export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

export async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!isPushSupported()) {
    return null;
  }

  const registration =
    await navigator.serviceWorker.getRegistration('/sw.js');

  return registration ?? null;
}

export async function getPushSubscription(): Promise<PushSubscription | null> {
  const registration = await getServiceWorkerRegistration();

  if (!registration) {
    return null;
  }

  return registration.pushManager.getSubscription();
}
