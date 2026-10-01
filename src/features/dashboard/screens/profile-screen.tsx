import { getTranslations } from 'next-intl/server';
import { getUserProfile } from '../api/user-service';
import ProfileForm from '../components/profile-form';
import { UserProfile } from '../types/profile.types';

export default async function ProfileScreen() {
  const t = await getTranslations('dashboard.profilePage');
  const result = await getUserProfile();

  if (!result.status || !result.payload) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-text-danger text-base font-medium">
          {t('loadError')}
        </p>
        <p className="text-text-soft text-sm">{result.message}</p>
      </div>
    );
  }

  const payload = result.payload;
  const user: UserProfile = {
    id: payload.user.id,
    username: payload.user.username,
    email: payload.user.email,
    phone: payload.user.phone,
    firstName: payload.user.firstName,
    lastName: payload.user.lastName,
    gender: payload.user.gender,
    photo: payload.user.photo,
    emailVerified: payload.user.emailVerified,
    phoneVerified: payload.user.phoneVerified,
    role: payload.user.role,
  };

  return (
    <div className="w-full mx-auto py-6 px-4 md:px-0 lg:px-16">
      <ProfileForm user={user} />
    </div>
  );
}
