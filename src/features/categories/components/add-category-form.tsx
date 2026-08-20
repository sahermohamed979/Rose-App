'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useCreateCategory } from '../hooks/use-create-category';
import { useUploadPhoto } from '@/shared/lib/hooks/use-upload-photo';
import DashboardPageHeader from '@/shared/components/dashboard-page-header';

export function AddCategoryForm() {
  const t = useTranslations('categoryDashboard');

  // Ref for the hidden file input, triggered by the custom upload button
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form field state
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    image?: string;
  }>({});

  // Mutations: image upload + category creation
  const { mutate: uploadPhoto, isPending: isUploading } =
    useUploadPhoto();
  const { mutate: createCategory, isPending: isSubmitting } =
    useCreateCategory();

  // Handles file selection, uploads immediately, stores the resulting URL
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setImageName(file.name);
    setErrors((prev) => ({ ...prev, image: undefined }));

    uploadPhoto(file, {
      onSuccess: (response) => {
        if (!response.status) {
          setErrors((prev) => ({ ...prev, image: response.message }));
          setImageName(null);
          return;
        }
        setImageUrl(response.payload.url);
      },
      onError: () => {
        setErrors((prev) => ({
          ...prev,
          image: 'Upload failed. Try again.',
        }));
        setImageName(null);
      },
    });
  };

  // Validates required fields before submit
  const validate = () => {
    const newErrors: { title?: string; image?: string } = {};
    if (!title.trim()) {
      newErrors.title = t('titleError');
    }
    if (!imageUrl) {
      newErrors.image = t('imageError');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submits the new category once validation passes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    createCategory({
      title: title.trim(),
      image: imageUrl as string,
    });
  };

  return (
    <div className="p-4  sm:p-6">
      <DashboardPageHeader title={t('addNew')} />

      <form
        onSubmit={handleSubmit}
        className="bg-bg-plain  rounded-2xl p-6 sm:p-6 w-full "
      >
        {/* Name field */}
        <div className="mb-5 w-full sm:w-3/4">
          <label className="block text-sm font-medium text-text-plain mb-2">
            {t('name')} <span className="text-red-600">*</span>
          </label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: undefined }));
              }
            }}
            placeholder={t('namePlaceholder')}
            className="rounded-lg"
          />
          {errors.title && (
            <p className="text-red-600 text-xs mt-1">
              {errors.title}
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
              {errors.image}
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
