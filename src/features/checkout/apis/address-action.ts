'use server';

import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import { ApiResponse } from '@/shared/lib/types/api';
import { IAddress } from '@/shared/lib/types/adresses.type';
import { AddressFormFields } from '../schemas/address-form-schema';

export const createAddress = async (
  address: AddressFormFields
): Promise<ApiResponse<IAddress>> => {
  const token = await getAuthToken();

  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/addresses`,
      {
        method: 'POST',
        headers: {
          ...HEADERS.jsonBody,
          ...HEADERS.authorization(token.accessToken),
        },
        body: JSON.stringify(address),
      }
    );

    const data: ApiResponse<IAddress> = await response.json();

    if (!response.ok || !data.status) {
      return {
        status: false,
        message: data.message ?? 'Failed to create address',
        code: response.status,
      };
    }

    return {
      status: true,
      message: data.message,
      code: data.code,
      payload: data.payload,
    };
  } catch (error: unknown) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
      code: 500,
    };
  }
};
