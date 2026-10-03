// is VAPID configured on this server
export function isVapidConfigured(): boolean {
  return Boolean(
    process.env.NEXT_VAPID_PUBLIC_KEY &&
    process.env.NEXT_VAPID_PRIVATE_KEY
  );
}

// get the VAPID public key
export function getVapidPublicKey(): string {
  const publicKey = process.env.NEXT_VAPID_PUBLIC_KEY;

  if (!publicKey) {
    throw new Error(
      'VAPID public key is not configured on this server'
    );
  }

  return publicKey;
}
