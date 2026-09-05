import { ApiResponse } from '@/shared/lib/types/api';
import {
  IProduct,
  ProductDetailsResponse,
} from '@/shared/lib/types/product-types';

type RawProduct = Omit<IProduct, 'gallery'> & {
  gallery: unknown;
};

type RawProductDetailsResponse = {
  product: RawProduct;
};

function parseGallery(gallery: unknown): string[] {
  if (Array.isArray(gallery)) {
    return gallery.filter(
      (image): image is string => typeof image === 'string'
    );
  }

  if (typeof gallery === 'string') {
    try {
      return parseGallery(JSON.parse(gallery));
    } catch {
      return [];
    }
  }

  return [];
}

export async function getSingleProduct(
  productId: string
): Promise<ProductDetailsResponse | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/products/${productId}`
    );
    const data: ApiResponse<RawProductDetailsResponse> =
      await response.json();

    if (!data.status) {
      return null;
    }

    return {
      product: {
        ...data.payload.product,
        gallery: parseGallery(data.payload.product.gallery),
      },
    };
  } catch {
    return null;
  }
}
