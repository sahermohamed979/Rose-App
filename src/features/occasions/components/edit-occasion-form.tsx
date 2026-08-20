'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import ViewOccasionImageModal from './view-occasion-image-modal';
import { useUpdateOccasion } from '../hooks/use-update-occasion';
import DashboardPageHeader from '@/shared/components/dashboard-page-header';
import { OccasionType } from '@/shared/lib/types/product-types';

export function EditOccasionForm({
  id,
  occasion,
}: {
  id: string;
  occasion: OccasionType;
}) {
  const t = useTranslations('occasionDashboard');
  const { mutate: updateOccasion, isPending: isSubmitting } =
    useUpdateOccasion(id);

  // Form field state — initialized directly from the loaded occasion
  const [title, setTitle] = useState(occasion.title);
  const [errors, setErrors] = useState<{ title?: string }>({});

  // View-image modal open/close state
  const [isImageOpen, setIsImageOpen] = useState(false);

  // Validates the title before submit
  const validate = () => {
    const newErrors: { title?: string } = {};
    if (!title.trim()) {
      newErrors.title = t('titleError');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submits the updated title
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    updateOccasion({ title: title.trim() });
  };

  return (
    <div className="p-4 sm:p-6">
      <DashboardPageHeader
        title={`${t('updateOccasion')}: ${occasion.title}`}
      />

      <form
        onSubmit={handleSubmit}
        className="bg-bg-plain rounded-2xl p-6 sm:p-6 w-full"
      >
        {/* Name field */}
        <div className="mb-5 w-full md:w-3/4">
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
            className="rounded-lg"
          />
          {errors.title && (
            <p className="text-red-600 text-xs mt-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* View image trigger + modal */}
        {occasion.image && (
          <div className="mb-8 flex justify-end w-full md:w-3/4">
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 text-sm text-text-info border border-border-muted rounded-lg px-3 py-2 hover:bg-bg-info-fade transition-colors"
            >
              <ImageIcon className="h-4 w-4" />
              {t('viewImage')}
            </button>

            <ViewOccasionImageModal
              isOpen={isImageOpen}
              onClose={() => setIsImageOpen(false)}
              imageUrl={occasion.image}
              title={occasion.title}
            />
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="default"
          className="w-full md:w-3/4"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('updating')}
            </span>
          ) : (
            t('updateOccasion')
          )}
        </Button>
      </form>
    </div>
  );
}
