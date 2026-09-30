import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ProfileScreen from '@/features/dashboard/screens/profile-screen';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dashboard.profilePage');
  return {
    title: t('title'),
  };
}

export default function ProfilePage() {
  return <ProfileScreen />;
}
