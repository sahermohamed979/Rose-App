import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import UserProfileForm from '@/features/account-setting/components/user-profile-form';
import { getProfileInfo } from '@/features/account-setting/apis/get-profile.api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.accountSetting',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function Profile() {
  const result = await getProfileInfo();

  if (!result.status) {
    throw new Error(result.message || 'Failed to load profile');
  }

  return <UserProfileForm initialUser={result.payload.user} />;
}
