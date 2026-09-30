'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { IProduct } from '../../../shared/lib/types/product-types';
import { useTranslations, useLocale } from 'next-intl';
import {
  formatCurrency,
  formatNumber,
} from '@/shared/lib/utils/formatter';
import { cn } from '@/shared/lib/utils/utils';
import { useRouter } from '@/i18n/navigation';
import DashboardButtons from '@/shared/components/dashboard-buttons';
import { useDeleteProduct } from '@/features/products/hooks/use-delete-product';

interface DashboardProductsTableProps {
  products: IProduct[];
}

export default function DashboardProductsTable({
  products,
}: DashboardProductsTableProps) {
  // Translations
  const t = useTranslations('products');

  // Hooks
  const locale = useLocale();
  const router = useRouter();
  const { mutate: deleteProduct } = useDeleteProduct();

  // No Products
  if (!products || products.length === 0) {
    return (
      <div className="w-full bg-white rounded-md text-lg font-bold p-8 text-center text-text-danger">
        {t('noProductsFound')}
      </div>
    );
  }

  return (
    <div className="w-full p-2">
      <Table>
        <TableHeader className="bg-bg-subtle border-b">
          <TableRow>
            <TableHead className="py-4 h-auto max-w-30 md:max-w-62 text-text-plain font-medium">
              {t('name')}
            </TableHead>
            <TableHead className="py-4 h-auto text-text-plain font-medium">
              {t('price')}
            </TableHead>
            <TableHead className="py-4 h-auto text-text-plain font-medium">
              {t('stock')}
            </TableHead>
            <TableHead className="hidden md:table-cell py-4 h-auto text-text-plain font-medium">
              {t('sales')}
            </TableHead>
            <TableHead className="hidden md:table-cell py-4 h-auto text-text-plain font-medium">
              {t('ratings')}
            </TableHead>
            <TableHead className="py-4 h-auto text-center"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="hover:bg-bg-primary-fade transition-colors group"
            >
              {/* Title */}
              <TableCell className="py-5 max-w-30 md:max-w-62 truncate text-text-plain font-semibold text-sm">
                {product.title}
              </TableCell>

              {/* Price */}
              <TableCell className="py-5 text-text-plain font-normal text-sm">
                {formatCurrency(Number(product.price), locale)}
              </TableCell>

              {/* Stock */}
              <TableCell
                className={cn(
                  'py-5 text-sm',
                  product.stock <= 5
                    ? 'text-red-500 font-bold'
                    : 'text-text-plain font-normal'
                )}
              >
                {formatNumber(product.stock, locale)}
              </TableCell>

              {/* Sales */}
              <TableCell className="hidden md:table-cell py-5 text-text-plain font-normal text-sm">
                {formatNumber(
                  product._count?.orderItems || 0,
                  locale
                )}
              </TableCell>

              {/* Ratings */}
              <TableCell className="hidden md:table-cell py-5">
                <span className="font-bold text-text-plain">
                  {formatNumber(product.rating, locale, 0, 2)}/
                  {formatNumber(5, locale)}
                </span>{' '}
                <span className="text-text-plain opacity-60 text-sm">
                  ({formatNumber(product.ratings, locale)})
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="py-5">
                <DashboardButtons
                  onEdit={() => {
                    router.push(
                      `/dashboard/products/${product.id}/edit`
                    );
                  }}
                  onDelete={() => {
                    deleteProduct(product.id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
