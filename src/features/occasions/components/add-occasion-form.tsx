'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import DashboardPageHeader from '@/shared/components/dashboard-page-header';
import { useCreateOccasion } from '../hooks/use-create-occasion';
import { useUploadPhoto } from '@/shared/lib/hooks/use-upload-photo';
import {
  occasionSchema,
  OccasionFormValues,
} from '../schemas/occasion-schema';

export function AddOccasionForm() {
  const t = useTranslations('occasionDashboard');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<OccasionFormValues>({
    resolver: zodResolver(occasionSchema),
    defaultValues: { title: '', description: '', image: '' },
  });

  const { mutate: uploadPhoto, isPending: isUploading } =
    useUploadPhoto();
  const { mutate: createOccasion, isPending: isSubmitting } =
    useCreateOccasion();

  // Handles file selection, uploads immediately, stores the resulting URL
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setImageName(file.name);
    clearErrors('image');

    uploadPhoto(file, {
      onSuccess: (response) => {
        if (!response.status) {
          setError('image', { message: response.message });
          setImageName(null);
          return;
        }
        setValue('image', response.payload.url, {
          shouldValidate: true,
        });
      },
      onError: () => {
        setError('image', { message: 'Upload failed. Try again.' });
        setImageName(null);
      },
    });
  };

  // Submits the new occasion, maps any backend field errors back onto the form
  const onSubmit = (values: OccasionFormValues) => {
    createOccasion(values, {
      onSuccess: (response) => {
        if (!response.status && response.errors?.length) {
          response.errors.forEach((err) => {
            if (
              err.path === 'title' ||
              err.path === 'description' ||
              err.path === 'image'
            ) {
              setError(err.path, { message: err.message });
            }
          });
        }
      },
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <DashboardPageHeader title={t('addNew')} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-bg-plain rounded-2xl p-6 sm:p-6 w-full"
      >
        {/* Name field */}
        <div className="mb-5 w-full sm:w-3/4">
          <label className="block text-sm font-medium text-text-plain mb-2">
            {t('name')} <span className="text-red-600">*</span>
          </label>
          <Input
            {...register('title')}
            placeholder={t('namePlaceholder')}
            className="rounded-lg"
          />
          {errors.title && (
            <p className="text-red-600 text-xs mt-1">
              {errors.title.message?.startsWith('titleError') ||
              errors.title.message === 'titleError'
                ? t('titleError')
                : errors.title.message}
            </p>
          )}
        </div>

        {/* Description field */}
        <div className="mb-5 w-full sm:w-3/4">
          <label className="block text-sm font-medium text-text-plain mb-2">
            {t('description')} <span className="text-red-600">*</span>
          </label>
          <Input
            {...register('description')}
            placeholder={t('descriptionPlaceholder')}
            className="rounded-lg"
          />
          {errors.description && (
            <p className="text-red-600 text-xs mt-1">
              {errors.description.message === 'descriptionError'
                ? t('descriptionError')
                : errors.description.message}
            </p>
          )}
        </div>

        {/* Image field — hidden native input, custom styled trigger button */}
        <div className="mb-8 w-full sm:w-3/4">
          <label className="block text-sm font-medium text-text-plain mb-2">
            {t('image')} <span className="text-red-600">*</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full flex items-center justify-between border border-border-subtle rounded-lg px-4 py-3 text-sm hover:border-border-muted transition-colors disabled:opacity-60"
          >
            <span className="text-text-muted truncate">
              {imageName ?? t('noFileChosen')}
            </span>
            <span className="flex items-center gap-1 text-text-danger shrink-0">
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('uploading')}
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  {t('uploadFile')}
                </>
              )}
            </span>
          </button>

          {errors.image && (
            <p className="text-red-600 text-xs mt-1">
              {errors.image.message === 'imageError'
                ? t('imageError')
                : errors.image.message}
            </p>
          )}
        </div>

        {/* Submit — disabled while uploading or submitting */}
        <Button
          type="submit"
          disabled={isSubmitting || isUploading}
          variant="default"
          className="w-full sm:w-3/4 mt-10"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('adding')}
            </span>
          ) : (
            t('addNew')
          )}
        </Button>
      </form>
    </div>
  );
}
