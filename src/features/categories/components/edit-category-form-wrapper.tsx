'use client';

import { SearchX } from 'lucide-react';
import { useCategory } from '../hooks/use-single-category';
import { EditCategorySkeleton } from '../skeletons/edit-category-skeleton';
import { EditCategoryForm } from './edit-category-form';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

export function EditCategoryFormWrapper({ id }: { id: string }) {
  const { data: category, isLoading } = useCategory(id);
  const router = useRouter();
  const t = useTranslations('categoryDashboard');
  if (isLoading) {
    return <EditCategorySkeleton />;
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-t-xl mt-4 border border-border-subtle">
        <SearchX className="h-10 w-10 text-text-muted mb-3" />
        <p className="text-text-primary font-semibold">
          {t('categoryNotFound')}
        </p>
        <p className="text-text-muted text-sm mt-1">
          {t('categoryNotFoundSubtitle')}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push('/dashboard/categories')}
        >
          {t('backToCategories')}
        </Button>
      </div>
    );
  }

  return (
    <EditCategoryForm key={category.id} id={id} category={category} />
  );
}
