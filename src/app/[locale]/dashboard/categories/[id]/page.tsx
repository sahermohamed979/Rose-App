import { EditCategoryFormWrapper } from '@/features/categories/components/edit-category-form-wrapper';

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditCategoryFormWrapper id={id} />;
}
