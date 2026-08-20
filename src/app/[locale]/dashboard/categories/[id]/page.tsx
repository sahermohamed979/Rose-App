import { EditCategoryFormWrapper } from '@/features/categories/components/edit-category-form-wrapper';

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id:combined } = await params;
  const id = combined.split('--').pop() as string;
  return <EditCategoryFormWrapper id={id} />;
}
