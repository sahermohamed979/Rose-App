'use client';

import { useCategory } from '../hooks/use-single-category';
import { EditCategoryForm } from './edit-category-form';

export function EditCategoryFormWrapper({ id }: { id: string }) {
  const { data: category, isLoading } = useCategory(id);

 
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
