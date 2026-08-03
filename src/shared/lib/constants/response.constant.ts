import { ErrorResponse } from '../types/api';

export const RESPONSES = {
  Unauthorized: {
    status: false,
    message: 'Unauthorized',
    code: 401,
  } as ErrorResponse,
};
