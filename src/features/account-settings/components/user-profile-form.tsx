'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { FieldGroup } from '@/shared/components/ui/field';
import { useProfile } from '../hooks/use-profile';
import { useUpdateProfile } from '../hooks/use-update-profile';
// import ChangeEmailModel from './change-email-model';
import ProfilePhoto from './profile-photo';
import ProfileFields from './profile-fields';
import DeleteAccountModal from './delete-account-modal';
import { useChangeEmailFlow } from '../hooks/use-change-email-flow';
import { useDeleteAccountFlow } from '../hooks/use-delete-account-flow';
import {
  profileFormSchema,
  UserProfileFormValues,
} from '../schemas/profile-schema';
import ChangeEmailModal from './change-email-modal';
import ProfileFormSkeleton from '../skeleons/profile-form-skelton';
import { useSession } from 'next-auth/react';

export default function UserProfileForm() {
  const t = useTranslations('profileForm');
  const tToast = useTranslations('profileForm.toast');
  const changeEmail = useChangeEmailFlow();
  const deleteAccount = useDeleteAccountFlow();
  const { data: session, update: updateSession } = useSession();
  const {
    mutate: updateProfileMutation,
    isPending: isUpdatingProfile,
  } = useUpdateProfile();

  const { data: user, isLoading, isError } = useProfile();

  const schema = profileFormSchema((key) => t(key));

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: '',
      photo: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phone: user.phone ?? '',
        email: user.email ?? '',
        gender: user.gender ?? '',
        photo: undefined,
      });
    }
  }, [user, form]);

  const handleSaveChanges = (values: UserProfileFormValues) => {
    const { email, gender, ...updateData } = values;

    updateProfileMutation(updateData, {
      onSuccess: async (result) => {
        if (!result.status) {
          toast.error(result.message);
          return;
        }

        await updateSession({
          user: {
            ...session?.user,
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            ...(updateData.photo && { photo: updateData.photo }),
          },
        });

        toast.success(tToast('profileUpdatedSuccess'));
        form.reset(values);
      },

      onError: () => {
        toast.error(tToast('profileUpdatedError'));
      },
    });
  };

  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  if (isError) {
    return (
      <p className="p-4 text-sm text-text-danger">{t('loadError')}</p>
    );
  }

  return (
    <form>
      <FieldGroup className="gap-4 p-4">
        <ProfilePhoto
          photo={user?.photo ?? undefined}
          onPhotoUploaded={(url) => {
            form.setValue('photo', url, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />

        <ProfileFields
          control={form.control}
          onChangeEmail={changeEmail.open}
        />

        <div className="flex justify-between flex-row">
          <button
            type="button"
            onClick={deleteAccount.open}
            className="text-[16px] text-text-danger transition-opacity hover:opacity-80"
          >
            {t('deleteAccount')}
          </button>

          <Button
            type="button"
            disabled={isUpdatingProfile || !form.formState.isDirty}
            onClick={form.handleSubmit(handleSaveChanges)}
          >
            {isUpdatingProfile ? t('saving') : t('saveChanges')}
          </Button>
        </div>
      </FieldGroup>

      <ChangeEmailModal
        isOpen={changeEmail.isOpen}
        onClose={changeEmail.close}
        step={changeEmail.step}
        setStep={changeEmail.setStep}
        newEmail={changeEmail.newEmail}
        setNewEmail={changeEmail.setNewEmail}
        timer={changeEmail.timer}
        handleNextStep={changeEmail.handleNextStep}
        handleResendCode={changeEmail.handleResendCode}
        handleVerifyOTP={changeEmail.handleVerifyOTP}
      />

      <DeleteAccountModal
        isOpen={deleteAccount.isOpen}
        onClose={deleteAccount.close}
        onConfirm={deleteAccount.handleDelete}
        isDeleting={deleteAccount.isDeleting}
      />
    </form>
  );
}
