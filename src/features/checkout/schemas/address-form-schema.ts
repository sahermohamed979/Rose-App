import { z } from 'zod';

const HAS_SCRIPT_OR_HTML =
  /<|>|script|javascript:|on\w+\s*=|{\s*{|\${/i;

// Title: Arabic/English letters, numbers, spaces, and hyphens
const TITLE_REGEX = /^[\p{L}\p{N}\s'-]+$/u;

// City: Arabic/English letters, spaces, and hyphens only
const CITY_REGEX = /^[\p{L}\s'-]+$/u;

// Street: letters, numbers, and common address punctuation
const STREET_REGEX = /^[\p{L}\p{N}\s.,/#\-']+$/u;

// Phone: optional +, then 10–15 digits
const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

function isSafeText(value: string): boolean {
  return !HAS_SCRIPT_OR_HTML.test(value);
}

export const addressFormSchema = (t: (key: string) => string) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(1, { message: t('address.errors.titleRequired') })
      .min(2, { message: t('address.errors.titleInvalid') })
      .max(50, { message: t('address.errors.titleInvalid') })
      .refine(isSafeText, {
        message: t('address.errors.unsafeInput'),
      })
      .regex(TITLE_REGEX, {
        message: t('address.errors.titleInvalid'),
      }),
    city: z
      .string()
      .trim()
      .min(1, { message: t('address.errors.cityRequired') })
      .min(2, { message: t('address.errors.cityInvalid') })
      .max(50, { message: t('address.errors.cityInvalid') })
      .refine(isSafeText, {
        message: t('address.errors.unsafeInput'),
      })
      .regex(CITY_REGEX, {
        message: t('address.errors.cityInvalid'),
      }),
    street: z
      .string()
      .trim()
      .min(1, { message: t('address.errors.streetRequired') })
      .min(3, { message: t('address.errors.streetInvalid') })
      .max(120, { message: t('address.errors.streetInvalid') })
      .refine(isSafeText, {
        message: t('address.errors.unsafeInput'),
      })
      .regex(STREET_REGEX, {
        message: t('address.errors.streetInvalid'),
      }),
    phone: z
      .string()
      .trim()
      .min(1, { message: t('address.errors.phoneRequired') })
      .refine(isSafeText, {
        message: t('address.errors.unsafeInput'),
      })
      .regex(PHONE_REGEX, {
        message: t('address.errors.phoneInvalid'),
      }),
  });

export type AddressFormFields = z.infer<
  ReturnType<typeof addressFormSchema>
>;

export type CreateAddressPayload = AddressFormFields & {
  isPrimary: boolean;
  latitude: number;
  longitude: number;
};

export type UpdateAddressPayload = CreateAddressPayload & {
  id: string;
};
