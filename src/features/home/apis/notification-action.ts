import {
  DEFAULT_PAGINATION,
  HEADERS,
} from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { NotificationData } from '../types/notification-types';

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

  const payload: ApiResponse<IPaginationResponse<NotificationData>> =
    await response.json();

  return payload;
}
