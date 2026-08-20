'use client';

import { useOccasion } from '../hooks/use-single-occasion';
import { EditOccasionForm } from './edit-occasion-form';

export function EditOccasionFormWrapper({ id }: { id: string }) {
  const { data: occasion, isLoading } = useOccasion(id);

  if (isLoading) {
    return null;
  }

  if (!occasion) {
    return <p>Occasion not found.</p>;
  }

  return (
    <EditOccasionForm key={occasion.id} id={id} occasion={occasion} />
  );
}
