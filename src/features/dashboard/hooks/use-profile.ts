'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfileAction, updateProfileAction, deleteAccountAction } from '../actions/profile.actions';
import { UpdateProfilePayload } from '../types/profile.types';

export const PROFILE_QUERY_KEY = ['user', 'profile'] as const;

export function useUserProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => getUserProfileAction(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData | UpdateProfilePayload) => {
      if (data instanceof FormData) {
        return updateProfileAction(data);
      }
      const formData = new FormData();
      if (data.firstName) formData.append('firstName', data.firstName);
      if (data.lastName) formData.append('lastName', data.lastName);
      if (data.phone) formData.append('phone', data.phone);
      if (data.photo instanceof File) formData.append('photo', data.photo);
      return updateProfileAction(formData);
    },
    onSuccess: (result) => {
      if (result.status) {
        queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      }
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: () => deleteAccountAction(),
  });
}
