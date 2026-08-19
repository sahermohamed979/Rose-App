'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/shared/components/ui/table';
import DashboardButtons from '@/shared/components/dashboard-buttons';
import { CategoryWithCount } from '../types/categories-type';
import { SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CategoriesTable({
  categories,
}: {
  categories: CategoryWithCount[];
}) {
  const t = useTranslations('categoryDashboard');

  const handleEdit = (id: string) => {
    // navigate to edit page or open edit modal
    console.log('edit', id);
  };

  const handleDelete = (id: string) => {
    // open delete confirmation dialog
    console.log('delete', id);
  };

  if (categories.length === 0) {
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
            <TableHead className="w-38">{t('products')}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              className="hover:bg-bg-primary-fade border-b border-border-subtle last:border-0"
            >
              <TableCell className="w-50 font-medium text-text-plain">
                {category.title}
              </TableCell>
              <TableCell className="w-38 text-[14px]">
                {category._count.products} products
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <DashboardButtons
                    onEdit={() => handleEdit(category.id)}
                    onDelete={() => handleDelete(category.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
