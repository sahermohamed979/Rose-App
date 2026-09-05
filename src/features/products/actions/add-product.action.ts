'use server';

import { revalidatePath, updateTag } from 'next/cache';

import { PRODUCTS_CACHE_TAG } from '../constants/product-cache';
import { uploadImage } from '../apis/upload-image';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import type { AddNewProduct } from '../types/add-product.types';

export async function addProductAction(formData: FormData) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    throw new Error('Unauthorized');
  }
  const accessToken = token.accessToken;

  const cover = formData.get('productCover');
  const gallery = formData.getAll('productGallery');

  if (!(cover instanceof File)) {
    throw new Error('Product cover is required');
  }
  if (!gallery.every((file) => file instanceof File)) {
    throw new Error('Invalid product gallery');
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
    throw new Error('Invalid product data');
  }

  // Product API accepts image URLs, so upload files before creating the product.
  const coverResult = await uploadImage(cover, accessToken);
  if (!coverResult.status) {
    throw new Error(coverResult.message);
  }

  const galleryResults = await Promise.all(
    gallery.map((file) => uploadImage(file, accessToken))
  );
  const galleryUrls = galleryResults.map((result) => {
    if (!result.status) {
      throw new Error(result.message);
    }
    return result.url;
  });

  const payload: AddNewProduct = {
    title: title.trim(),
    description: description.trim(),
    stock,
    price,
    discountType: 'PERCENT',
    discountValue: discount,
    categoryId,
    // occasionId,
    cover: coverResult.url,
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
  const result = await response.json();

  if (!response.ok || result.status === false) {
    throw new Error(result.message ?? 'Failed to add product');
  }

  // Refresh server-rendered product lists after the mutation succeeds.
  updateTag(PRODUCTS_CACHE_TAG);
  revalidatePath('/[locale]/dashboard/products', 'page');

  return result;
}
