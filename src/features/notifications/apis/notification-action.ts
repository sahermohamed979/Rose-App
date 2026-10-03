'use server';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import {
  ApiResponse,
  IPaginationResponse,
  SuccessResponseNoPayload,
} from '@/shared/lib/types/api';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { NotificationType } from '../types/notification-types';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import {
  PushStatusResponse,
  PushSubscriptionInput,
  UnreadCountResponse,
  VapidKeyResponse,
} from '../types/notification-types';
import {
  addSubscription,
  countSubscriptions,
  removeSubscription,
} from '../lib/push.store';
import {
  getVapidPublicKey,
  isVapidConfigured,
} from '../lib/push.service';

// get all notifications
export async function getAllNotification(req: NextRequest) {
  const locale = req.headers.get('Accept-Language') || 'en';
  const token = await getToken({ req });
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }

  const page = Number(req.nextUrl.searchParams.get('page')) || 1;

  const response = await fetch(
    `${process.env.NEXT_API_URL}/notifications?page=${page}`,
    {
      method: 'GET',
      headers: {
        ...HEADERS.authorization(token.accessToken),
        'Accept-Language': locale,
      },
    }
  );

  const payload: ApiResponse<IPaginationResponse<NotificationType>> =
    await response.json();

  return payload;
}

// mark all as read server action
export async function markAllAsReadServerAction() {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/notifications/mark-all-read`,
      {
        method: 'PATCH',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
      }
    );
    const payload: ApiResponse<SuccessResponseNoPayload> =
      await response.json();

    return payload;
  } catch (error) {
    return error;
  }
}

// get web push status server action
export async function getPushStatusServerAction() {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const pushConfigured = isVapidConfigured();
    const subscriptionCount = countSubscriptions(token.user.id);

    // Unread count (best-effort from backend)
    let unreadCount = 0;
    const response = await fetch(
      `${process.env.NEXT_API_URL}/notifications/unread-count`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
      }
    );

    const payload: ApiResponse<UnreadCountResponse> =
      await response.json();

    if (payload.status) {
      unreadCount = payload.payload.unreadCount;
    }

    return {
      status: true,
      code: 200,
      payload: { pushConfigured, subscriptionCount, unreadCount },
    } as ApiResponse<PushStatusResponse>;
  } catch (error) {
    return error;
  }
}

// get vapid public key server action
export async function getVapidPublicKeyServerAction() {
  try {
    const publicKey = getVapidPublicKey();

    return {
      status: true,
      code: 200,
      payload: { publicKey },
    } as ApiResponse<VapidKeyResponse>;
  } catch (error) {
    return error;
  }
}

// subscribe to web push server action
export async function subscribePushServerAction(
  subscription: PushSubscriptionInput
) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    addSubscription(token.user.id, subscription);

    return {
      status: true,
      code: 200,
      message: 'Subscribed successfully',
    } as ApiResponse<SuccessResponseNoPayload>;
  } catch (error) {
    return error;
  }
}

// unsubscribe from web push server action
export async function unsubscribePushServerAction(endpoint: string) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    removeSubscription(endpoint);

    return {
      status: true,
      code: 200,
      message: 'Unsubscribed successfully',
    } as ApiResponse<SuccessResponseNoPayload>;
  } catch (error) {
    return error;
  }
}

export async function getUnreadCountServerAction() {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/notifications/unread-count`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
      }
    );

    const payload: ApiResponse<UnreadCountResponse> =
      await response.json();

    return payload;
  } catch (error) {
    return error;
  }
}

// mark one as read server action
export async function markOneAsReadServerAction(id: string) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/notifications/${id}`,
      {
        method: 'PATCH',
        headers: {
          ...HEADERS.authorization(token.accessToken),
          ...HEADERS.jsonBody,
        },
        body: JSON.stringify({
          isRead: true,
        }),
      }
    );

    const payload: ApiResponse<SuccessResponseNoPayload> =
      await response.json();

    return payload;
  } catch (error) {
    return error;
  }
}
// delete one notification server action
export async function clearAllNotificationsServerAction() {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/notifications/clear-all`,
      {
        method: 'DELETE',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
      }
    );

    const payload: ApiResponse<SuccessResponseNoPayload> =
      await response.json();

    return payload;
  } catch (error) {
    return error;
  }
}
// mark one as read server action
export async function clearOneNotificationServerAction(id: string) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/notifications/${id}`,
      {
        method: 'DELETE',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
      }
    );

    const payload: ApiResponse<SuccessResponseNoPayload> =
      await response.json();

    return payload;
  } catch (error) {
    return error;
  }
}
