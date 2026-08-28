'use client';

import { SearchX } from 'lucide-react';
import { useOccasion } from '../hooks/use-single-occasion';
import { EditOccasionSkeleton } from '../skeletons/edit-occasion-skeleton';
import { EditOccasionForm } from './edit-occasion-form';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export function EditOccasionFormWrapper({ id }: { id: string }) {
  const { data: occasion, isLoading } = useOccasion(id);
  const router = useRouter();
  const t = useTranslations('occasionDashboard');
  if (isLoading) {
    return <EditOccasionSkeleton />;
  }

  if (!occasion) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-t-xl mt-4 border border-border-subtle">
        <SearchX className="h-10 w-10 text-text-muted mb-3" />
        <p className="text-text-primary font-semibold">
          {t('occasionNotFound')}
        </p>
        <p className="text-text-muted text-sm mt-1">
          {t('occasionNotFoundSubtitle')}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push('/dashboard/occasions')}
        >
          {t('backToOccasions')}
        </Button>
      </div>
    );
  }

  return (
    <EditOccasionForm key={occasion.id} id={id} occasion={occasion} />
  );
}
