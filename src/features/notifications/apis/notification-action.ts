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
