'use server';

import { revalidatePath } from 'next/cache';
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  uploadImage,
} from '../api/user-service';

export async function getUserProfileAction() {
  return getUserProfile();
}

export async function updateProfileAction(formData: FormData) {
  const jsonPayload: Record<string, string> = {};

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const phone = formData.get('phone');
  const photo = formData.get('photo');

  if (typeof firstName === 'string' && firstName.trim()) {
    jsonPayload.firstName = firstName.trim();
  }
  if (typeof lastName === 'string' && lastName.trim()) {
    jsonPayload.lastName = lastName.trim();
  }
  if (typeof phone === 'string' && phone.trim()) {
    jsonPayload.phone = phone.trim();
  }

  const removePhoto = formData.get('removePhoto') === 'true';

  // If a photo file was selected, upload it to /api/upload first
  if (photo instanceof File && photo.size > 0) {
    const uploadResult = await uploadImage(photo);
    if (!uploadResult.status) {
      return {
        status: false as const,
        message: uploadResult.message,
        code: uploadResult.code,
      };
    }
    jsonPayload.photo = uploadResult.url;
  } else if (removePhoto) {
    jsonPayload.photo = '';
  }

  const result = await updateUserProfile(jsonPayload);
  if (result.status) {
    revalidatePath('/[locale]/dashboard/profile', 'page');
    revalidatePath('/dashboard/profile');
  }
  return result;
}

export async function deleteAccountAction() {
  return deleteUserAccount();
}
