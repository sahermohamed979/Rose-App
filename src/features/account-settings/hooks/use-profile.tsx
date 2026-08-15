'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getProfileInfo } from '../apis/get-profile.api';
import { UserProfile } from '../types/profile-types';

export const PROFILE_QUERY_KEY = ['profile'] as const;

export const useProfile = () => {
  const { status } = useSession();

  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async (): Promise<UserProfile> => {
      const response = await getProfileInfo();

      if (!response.status) {
        throw new Error(response.message);
      }

      return response.payload.user;
    },
    enabled: status === 'authenticated',
    staleTime: 5 * 60 * 1000,
  });
};
