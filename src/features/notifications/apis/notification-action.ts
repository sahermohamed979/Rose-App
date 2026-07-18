'use server';
import {
  DEFAULT_PAGINATION,
  HEADERS,
} from '@/shared/lib/constants/api.constants';
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
  const token = await getToken({ req });
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }

  const page = Number(req.nextUrl.searchParams.get('page')) || 1;
  const limit =
    Number(req.nextUrl.searchParams.get('limit')) ||
    DEFAULT_PAGINATION;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        ...HEADERS.authorization(token.accessToken),
      },
    }
  );

  const payload: ApiResponse<IPaginationResponse<NotificationType>> =
    await response.json();

  return payload;
}

// mark all as read
export async function markAllAsRead(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/mark-all-as-read`,
    {
      method: 'PUT',
      headers: {
        ...HEADERS.authorization(token.accessToken),
      },
    }
  );

  const payload: ApiResponse<NotificationType> =
    await response.json();

  return payload;
}
// mark all as read server action
export async function markAllAsReadServerAction() {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/mark-all-read`,
      {
        method: 'PATCH',
        headers: {
          ...HEADERS.authorization(token!),
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
  const jwt = await getAuthToken();
  const token = jwt?.token;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`,
      {
        method: 'PATCH',
        headers: {
          ...HEADERS.authorization(token!),
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
// delete one notification server action
export async function clearAllNotificationsServerAction() {
  const jwt = await getAuthToken();
  const token = jwt?.token;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/clear-all`,
      {
        method: 'DELETE',
        headers: {
          ...HEADERS.authorization(token!),
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
