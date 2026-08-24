import UserProfileForm from '@/features/account-setting/components/user-profile-form';
import { getProfileInfo } from '@/features/account-setting/apis/get-profile.api';

export default async function Profile() {
  const result = await getProfileInfo();

  const user = result.status ? result.payload.user : undefined;

  return <UserProfileForm initialUser={user} />;
}
