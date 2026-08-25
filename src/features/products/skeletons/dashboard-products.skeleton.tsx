'use client';

import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { useTranslations } from 'next-intl';

export default function DashboardProductsTableSkeleton() {
  const t = useTranslations('products');

  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="w-full overflow-hidden">
      <Table>
        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow key={index} className="transition-colors group">
              {/* Title */}
              <TableCell className="py-5 max-w-30 md:max-w-62">
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </TableCell>

              {/* Price */}
              <TableCell className="py-5">
                <Skeleton className="h-4 w-20 rounded-md" />
              </TableCell>

              {/* Stock */}
              <TableCell className="py-5">
                <Skeleton className="h-4 w-10 rounded-md" />
              </TableCell>

              {/* Sales */}
              <TableCell className="hidden md:table-cell py-5">
                <Skeleton className="h-4 w-12 rounded-md" />
              </TableCell>

              {/* Ratings */}
              <TableCell className="hidden md:table-cell py-5">
                <Skeleton className="h-4 w-24 rounded-md" />
              </TableCell>

              {/* Actions */}
              <TableCell className="py-5">
                <div className="flex justify-center items-center gap-2">
                  <Skeleton className="hidden md:block h-8 w-16 rounded-md" />
                  <Skeleton className="hidden md:block h-8 w-16 rounded-md" />
                  <Skeleton className="md:hidden h-8 w-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
