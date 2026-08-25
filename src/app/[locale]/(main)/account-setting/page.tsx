import UserProfileForm from '@/features/account-setting/components/user-profile-form';
import { getProfileInfo } from '@/features/account-setting/apis/get-profile.api';

export default async function Profile() {
  const result = await getProfileInfo();

  if (!result.status) {
    throw new Error(result.message || 'Failed to load profile');
  }

  return <UserProfileForm initialUser={result.payload.user} />;
}
