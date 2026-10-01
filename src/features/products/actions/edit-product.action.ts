'use server';

import { revalidatePath, updateTag } from 'next/cache';

import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import type { ApiResponse } from '@/shared/lib/types/api';
import { uploadImage } from '../apis/upload-image';
import { PRODUCTS_CACHE_TAG } from '../constants/product-cache';
import type { ProductActionResult } from '../types/product-action-result.types';

export async function editProductAction(
  productId: string,
  formData: FormData,
  existingGallery: string[]
): Promise<ProductActionResult> {
  try {
    const token = await getAuthToken();
    if (!token?.accessToken) {
      return { success: false };
    }
    const accessToken = token.accessToken;

    const title = formData.get('title');
    const description = formData.get('description');
    const categoryId = formData.get('category');
    const stock = Number(formData.get('quantity'));
    const price = Number(formData.get('price'));
    const discountValue = Number(formData.get('discount'));

    if (
      typeof title !== 'string' ||
      !title.trim() ||
      typeof description !== 'string' ||
      !description.trim() ||
      typeof categoryId !== 'string' ||
      !categoryId ||
      !Number.isInteger(stock) ||
      stock < 0 ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isFinite(discountValue) ||
      discountValue < 0 ||
      discountValue > 100
    ) {
      return { success: false };
    }

    const payload: Record<string, unknown> = {
      title: title.trim(),
      description: description.trim(),
      categoryId,
      stock,
      price,
      discountType: 'PERCENT',
      discountValue,
    };

    const cover = formData.get('productCover');
    if (cover instanceof File && cover.size > 0) {
      const coverResult = await uploadImage(cover, accessToken);
      if (!coverResult.status) {
        return { success: false, message: coverResult.message };
      }
      payload.cover = coverResult.url;
    }

    const galleryFiles = formData
      .getAll('productGallery')
      .filter(
        (value): value is File =>
          value instanceof File && value.size > 0
      );

    if (galleryFiles.length > 0) {
      const galleryResults = await Promise.all(
        galleryFiles.map((file) => uploadImage(file, accessToken))
      );

      const failedGalleryUpload = galleryResults.find(
        (result) => !result.status
      );
      if (failedGalleryUpload && !failedGalleryUpload.status) {
        return {
          success: false,
          message: failedGalleryUpload.message,
        };
      }
      const newGallery = galleryResults.flatMap((result) =>
        result.status ? [result.url] : []
      );

      payload.gallery = [...existingGallery, ...newGallery];
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/products/${productId}`,
      {
        method: 'PATCH',
        headers: {
          ...HEADERS.jsonBody,
          ...HEADERS.authorization(accessToken),
        },
        body: JSON.stringify(payload),
      }
    );
    const result: ApiResponse<unknown> = await response.json();

    if (!result.status) {
      return { success: false, message: result.message };
    }
    if (!response.ok) {
      return { success: false };
    }

    updateTag(PRODUCTS_CACHE_TAG);
    revalidatePath('/[locale]/dashboard/products', 'page');

    return { success: true };
  } catch {
    return { success: false };
  }
}
