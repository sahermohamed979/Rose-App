'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { Link, useRouter } from '@/i18n/navigation';
import { Input } from '@/shared/components/ui/input';
import { PhoneInput } from '@/shared/components/ui/input-phone';
import { UserProfile } from '../types/profile.types';
import { profileSchema, ProfileFormValues } from '../schemas/profile-schema';
import { useUpdateProfile, useDeleteAccount } from '../hooks/use-profile';
import ProfileAvatar from './profile-avatar';
import DeleteAccountDialog from './delete-account-dialog';

interface ProfileFormProps {
  user: UserProfile;
}

function InputField({
  id,
  label,
  disabled,
  children,
}: {
  id: string;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`text-sm font-medium ${disabled ? 'text-text-soft' : 'text-text-plain'}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const t = useTranslations('dashboard.profilePage');
  const locale = useLocale();
  const router = useRouter();
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user.photo ?? null);
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: user.phone ?? '',
    },
  });

  useEffect(() => {
    reset({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: user.phone ?? '',
    });
    setPhotoPreview(user.photo ?? null);
    setIsPhotoRemoved(false);
    setPendingPhoto(null);
  }, [user, reset]);

  function handlePhotoChange(file: File) {
    setPendingPhoto(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    setIsPhotoRemoved(false);
  }

  function handlePhotoRemove() {
    setPendingPhoto(null);
    setPhotoPreview(null);
    setIsPhotoRemoved(true);
  }

  function onSubmit(values: ProfileFormValues) {
    const formData = new FormData();
    if (values.firstName) formData.append('firstName', values.firstName);
    if (values.lastName) formData.append('lastName', values.lastName);
    if (values.phone) formData.append('phone', values.phone);
    if (pendingPhoto) {
      formData.append('photo', pendingPhoto);
    } else if (isPhotoRemoved) {
      formData.append('removePhoto', 'true');
    }

    updateProfile(formData, {
      onSuccess: (result) => {
        if (result.status) {
          toast.success(t('success.updated'));
          setPendingPhoto(null);
          setIsPhotoRemoved(false);
          if (result.payload?.user?.photo) {
            setPhotoPreview(result.payload.user.photo);
          } else {
            setPhotoPreview(null);
          }
          router.refresh();
        } else {
          toast.error(result.message || t('errors.updateFailed'));
        }
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : t('errors.updateFailed'));
      },
    });
  }

  function handleDeleteConfirm() {
    deleteAccount(undefined, {
      onSuccess: async (result) => {
        if (result.status) {
          toast.success(t('success.deleted'));
          await signOut({ callbackUrl: `/${locale}/login` });
        } else {
          toast.error(result.message || t('errors.deleteFailed'));
          setDeleteOpen(false);
        }
      },
      onError: () => {
        toast.error(t('errors.deleteFailed'));
        setDeleteOpen(false);
      },
    });
  }

  const genderLabel =
    user.gender?.toUpperCase() === 'MALE'
      ? t('genderMale')
      : user.gender?.toUpperCase() === 'FEMALE'
        ? t('genderFemale')
        : user.gender ?? '';

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-bg-plain rounded-2xl border border-border-subtle shadow-subtle p-6 md:p-8 flex flex-col gap-6"
      >
        {/* Title */}
        <h1 className="text-text-plain text-2xl font-bold">
          {t('title')}
        </h1>

        {/* Photo Upload */}
        <ProfileAvatar
          photoUrl={isPhotoRemoved ? null : (photoPreview ?? user.photo)}
          firstName={user.firstName}
          onPhotoChange={handlePhotoChange}
          onPhotoRemove={handlePhotoRemove}
        />

        {/* Divider */}
        <div className="h-px bg-border-subtle" />

        {/* First + Last Name row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField id="firstName" label={t('firstName')}>
            <div className="flex flex-col gap-1">
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder={t('firstName')}
                invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="text-text-danger text-xs">
                  {t(`errors.${errors.firstName.message}` as Parameters<typeof t>[0])}
                </p>
              )}
            </div>
          </InputField>

          <InputField id="lastName" label={t('lastName')}>
            <div className="flex flex-col gap-1">
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder={t('lastName')}
                invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="text-text-danger text-xs">
                  {t(`errors.${errors.lastName.message}` as Parameters<typeof t>[0])}
                </p>
              )}
            </div>
          </InputField>
        </div>

        {/* Email (Read Only) */}
        <InputField id="email" label={t('email')} disabled>
          <Input
            id="email"
            type="email"
            value={user.email}
            readOnly
            disabled
          />
        </InputField>

        {/* Phone with Country Flags */}
        <InputField id="phone" label={t('phone')}>
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1">
                <PhoneInput
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="1012345678"
                  value={field.value ?? undefined}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  disabled={isSaving}
                />
                {errors.phone && (
                  <p className="text-text-danger text-xs">
                    {t(`errors.${errors.phone.message}` as Parameters<typeof t>[0])}
                  </p>
                )}
              </div>
            )}
          />
        </InputField>

        {/* Gender — disabled */}
        <InputField id="gender" label={t('gender')} disabled>
          <div className="h-11 w-full flex items-center rounded-lg px-3 py-1 text-sm bg-bg-subtle border border-border-muted text-text-subtle select-none cursor-not-allowed">
            {genderLabel}
          </div>
        </InputField>

        {/* Footer actions */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-2">
          {/* Left: delete + change password */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="text-text-danger text-sm font-semibold hover:underline transition-all cursor-pointer"
            >
              {t('deleteAccount')}
            </button>
            <Link
              href="/dashboard/profile/change-password"
              className="text-text-plain text-sm font-semibold hover:underline transition-all cursor-pointer"
            >
              {t('changePassword')}
            </Link>
          </div>

          {/* Right: save */}
          <button
            type="submit"
            id="profile-save-btn"
            disabled={isSaving || (!isDirty && !pendingPhoto && !isPhotoRemoved)}
            className="w-full md:w-auto px-8 py-2.5 rounded-xl bg-bg-primary hover:bg-maroon-700 text-white text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px] cursor-pointer"
          >
            {isSaving ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                {t('saving')}
              </>
            ) : (
              t('saveChanges')
            )}
          </button>
        </div>
      </form>

      {/* Delete Account Dialog */}
      <DeleteAccountDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
}
