import { ApiValidationError } from '../types/register-types';

export function mapOtpBackendError(
  errors?: ApiValidationError[]
): string {
  const otpError =
    errors?.find((e) => e.path === 'code') ?? errors?.[0];
  const msg = otpError?.message?.toLowerCase() ?? '';

  if (msg.includes('expired')) {
    return 'expired';
  }
  if (msg.includes('6 digit') || msg.includes('invalid')) {
    return 'invalid';
  }

  return 'invalid';
}
