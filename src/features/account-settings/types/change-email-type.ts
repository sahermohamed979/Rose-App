import { ApiResponse } from '@/shared/lib/types/api';

export interface RequestEmailChangePayload {
  newEmail: string;
}

export interface ConfirmEmailChangePayload {
  code: string;
}

export type RequestEmailChangeResponse = ApiResponse<string>;

export type ConfirmEmailChangeResponse = ApiResponse<string>;
