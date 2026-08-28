'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { SearchX } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/shared/components/ui/table';
import DashboardButtons from '@/shared/components/dashboard-buttons';
import { useDeleteOccasion } from '../hooks/use-delete-occasion';
import { OccasionType } from '@/shared/lib/types/product-types';
import ConfirmDeleteModal from '@/shared/components/confirm-delete-modal';

export function OccasionsTable({
  occasions,
}: {
  occasions: OccasionType[];
}) {
  const t = useTranslations('occasionDashboard');
  const router = useRouter();

  // Delete modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(
    null
  );
  const { mutate: deleteOccasion, isPending: isDeleting } =
    useDeleteOccasion();

  // Navigate to the edit page for a given occasion
  const handleEdit = (id: string, title: string) => {
    const slug = title.toLowerCase().trim().replace(/\s+/g, '-');
    router.push(`/dashboard/occasions/${slug}--${id}`);
  };

  // Open the delete confirmation modal for a given occasion
  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
  };

  // Confirm deletion, close the modal on success
  const handleConfirmDelete = () => {
    if (!deleteTargetId) {
      return;
    }
    deleteOccasion(deleteTargetId, {
      onSuccess: () => setDeleteTargetId(null),
    });
  };

  // Close the modal without deleting
  const handleCancelDelete = () => setDeleteTargetId(null);

  // Empty state — no occasions match the current filter/search
  if (occasions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-t-xl mt-4 border border-border-subtle">
        <SearchX className="h-10 w-10 text-text-muted mb-3" />
        <p className="text-text-primary font-semi-bold">
          {t('noMatch')}
        </p>
        <p className="text-text-muted text-sm mt-1">
          {t('trySearch')}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-t-xl overflow-hidden mt-4">
      <Table>
        <TableHeader className=" w-full bg-bg-subtle border-b border-border-muted text-text-plain p-2">
          <TableRow>
            <TableHead className="w-50">{t('name')}</TableHead>
            <TableHead className="w-38">{t('description')}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {occasions.map((occasion) => (
            <TableRow
              key={occasion.id}
              className="hover:bg-bg-primary-fade border-b border-border-subtle last:border-0"
            >
              <TableCell className="w-50 font-medium text-text-plain">
                {occasion.title}
              </TableCell>
              <TableCell className="w-38 text-[14px]">
                {occasion.description}
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <DashboardButtons
                    onEdit={() =>
                      handleEdit(occasion.id, occasion.title)
                    }
                    onDelete={() => handleDelete(occasion.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete confirmation modal  */}
      {deleteTargetId && (
        <ConfirmDeleteModal
          isOpen={!!deleteTargetId}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
          title={`${t('deleteOccasion')} ${occasions.find((o) => o.id === deleteTargetId)?.title ?? ''}`}
        />
      )}
    </div>
  );
}
