'use server';

import { revalidatePath, updateTag } from 'next/cache';

import { PRODUCTS_CACHE_TAG } from '../constants/product-cache';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { uploadPhoto } from '@/shared/lib/actions/upload-photo';
import type { ApiResponse } from '@/shared/lib/types/api';
import type { AddNewProduct } from '../types/add-product.types';
import type { ProductActionResult } from '../types/product-action-result.types';

export async function addProductAction(
  formData: FormData
): Promise<ProductActionResult> {
  try {
    const token = await getAuthToken();
    if (!token?.accessToken) {
      return { success: false };
    }
    const accessToken = token.accessToken;

    const cover = formData.get('productCover');
    const gallery = formData.getAll('productGallery');

    if (!(cover instanceof File)) {
      return { success: false };
    }
    if (!gallery.every((file) => file instanceof File)) {
      return { success: false };
    }

    const stock = Number(formData.get('quantity'));
    const price = Number(formData.get('price'));
    const discount = Number(formData.get('discount'));
    const title = formData.get('title');
    const description = formData.get('description');
    const categoryId = formData.get('category');
    const occasionId = formData.get('occasion');

    if (
      typeof title !== 'string' ||
      !title.trim() ||
      typeof description !== 'string' ||
      !description.trim() ||
      typeof categoryId !== 'string' ||
      !categoryId ||
      typeof occasionId !== 'string' ||
      !occasionId ||
      !Number.isInteger(stock) ||
      stock < 0 ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isFinite(discount) ||
      discount < 0 ||
      discount > 100
    ) {
      return { success: false };
    }

    // Product API accepts image URLs, so upload files before creating the product.
    const coverResult = await uploadPhoto(cover);
    if (!coverResult.status) {
      return { success: false, message: coverResult.message };
    }

    const galleryResults = await Promise.all(
      gallery.map((file) => uploadPhoto(file))
    );
    const failedGalleryUpload = galleryResults.find(
      (result) => !result.status
    );
    if (failedGalleryUpload && !failedGalleryUpload.status) {
      return { success: false, message: failedGalleryUpload.message };
    }
    const galleryUrls = galleryResults.flatMap((result) =>
      result.status ? [result.payload.url] : []
    );

    const payload: AddNewProduct = {
      title: title.trim(),
      description: description.trim(),
      stock,
      price,
      discountType: 'PERCENT',
      discountValue: discount,
      categoryId,
      // occasionId,
      cover: coverResult.payload.url,
      gallery: galleryUrls,
    };

    const response = await fetch(
      `${process.env.NEXT_API_URL}/products`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          ...HEADERS.jsonBody,
          ...HEADERS.authorization(accessToken),
        },
      }
    );
    const result: ApiResponse<unknown> = await response.json();

    if (!result.status) {
      return { success: false, message: result.message };
    }
    if (!response.ok) {
      return { success: false };
    }

    // Refresh server-rendered product lists after the mutation succeeds.
    updateTag(PRODUCTS_CACHE_TAG);
    revalidatePath('/[locale]/dashboard/products', 'page');

    return { success: true };
  } catch {
    return { success: false };
  }
}
