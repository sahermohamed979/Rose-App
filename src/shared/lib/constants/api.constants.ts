export const HEADERS = {
  jsonBody: {
    'Content-Type': 'application/json',
  },
  authorization: (token: string) => ({
    Authorization: `Bearer ${token}`,
  }),
};
export const DEFAULT_PAGINATION = 6;
