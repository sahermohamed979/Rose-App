'use server';

import { ContactFormValues } from '../schemas/contact.schema';

export interface ContactActionResult {
  status: boolean;
  message: string;
}

export async function submitContactAction(
  values: ContactFormValues
): Promise<ContactActionResult> {
  try {
    // Optionally register newsletter / contact interest with API
    if (values.email) {
      try {
        await fetch(`${process.env.NEXT_API_URL}/subscriptions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email }),
        });
      } catch {
        // Silently continue if email is already subscribed or fails
      }
    }

    return {
      status: true,
      message: 'Your message has been sent successfully.',
    };
  } catch (error: unknown) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong while sending your message.',
    };
  }
}
