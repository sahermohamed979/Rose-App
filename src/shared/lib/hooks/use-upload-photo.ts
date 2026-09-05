'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadPhoto } from '@/shared/lib/actions/upload-photo';

export const useUploadPhoto = () => {
  return useMutation({
    mutationFn: uploadPhoto,
  });
};
