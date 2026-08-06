import { getAuthToken } from '@/shared/lib/actions/getToken';

interface ConfirmCardBody {
  paymentIntentId: string;
  paymentMethodId: string;
}

export async function confirmCardPayment(body: ConfirmCardBody) {
  const token = await getAuthToken();

  const response = await fetch(
    `${process.env.NEXT_API_URL}/payments/confirm`,
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
