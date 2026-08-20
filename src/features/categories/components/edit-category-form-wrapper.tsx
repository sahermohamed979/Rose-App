'use client';

import { useSetBreadcrumbLabel } from '@/shared/context/bradcrumb-label-context';
import { useCategory } from '../hooks/use-single-category';
import { EditCategoryForm } from './edit-category-form';

export function EditCategoryFormWrapper({ id }: { id: string }) {
  const { data: category, isLoading } = useCategory(id);

  useSetBreadcrumbLabel(
    id,
    category ? `Update Category: ${category.title}` : undefined
  );

  if (isLoading) {
    return null;
  }

  if (!category) {
    return <p>Category not found.</p>;
  }

  return (
    <EditCategoryForm key={category.id} id={id} category={category} />
  );
}
