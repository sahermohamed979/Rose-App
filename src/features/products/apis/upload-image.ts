import { HEADERS } from '@/shared/lib/constants/api.constants';

export async function uploadImage(
  file: File,
  accessToken: string
): Promise<
  | { status: true; url: string }
  | { status: false; message: string; code?: number }
> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(
      `${process.env.NEXT_API_URL}/upload`,
      {
        method: 'POST',
        headers: {
          ...HEADERS.authorization(accessToken),
        },
        body: formData,
      }
    );

    const data = await response.json();
    if (!data.status) {
      return {
        status: false,
        message: data.message ?? 'Failed to upload image',
        code: response.status,
      };
    }
    return {
      status: true,
      url: data.payload.url,
    };
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred during image upload',
      code: 500,
    };
  }
}
