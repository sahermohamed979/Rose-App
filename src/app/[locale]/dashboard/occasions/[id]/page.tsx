import { EditOccasionFormWrapper } from '@/features/occasions/components/edit-category-form-wrapper';

export default async function EditOccasionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: combined } = await params;
  const id = combined.split('--').pop() as string;
  return <EditOccasionFormWrapper id={id} />;
}
