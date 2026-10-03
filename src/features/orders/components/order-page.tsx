'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Banknote,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  CreditCard,
  Package,
  PackageOpen,
  RefreshCw,
  Truck,
  XCircle,
} from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { OrdersResponse } from '../types/order-types';

interface OrderPageProps {
  initialData: OrdersResponse;
}

export default function OrderPage({ initialData }: OrderPageProps) {
  // Translations
  const t = useTranslations('orders');
  const locale = useLocale();

  // State
  const [expandedOrders, setExpandedOrders] = useState<
    Record<string, boolean>
  >({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Queries
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ['orders-page'],

    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/orders?page=${pageParam}&limit=12`
      );

      const resData: OrdersResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.status === false
            ? resData.message
            : 'Something went wrong'
        );
      }

      return resData;
    },

    initialPageParam: 1,

    initialData: {
      pages: [initialData],
      pageParams: [1],
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.status === false) {
        return undefined;
      }

      const { page, totalPages } = lastPage.payload.metadata;

      if (page < totalPages) {
        return page + 1;
      }

      return undefined;
    },
  });

  // Variables
  const orders =
    data?.pages.flatMap((page) => {
      if (page.status === false) {
        return [];
      }

      return page.payload.data;
    }) ?? [];

  // Functions
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const dateLocale = locale === 'ar' ? 'ar-EG' : 'en-GB';

      return `${date.toLocaleDateString(dateLocale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })} • ${date.toLocaleTimeString(dateLocale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: locale === 'en',
      })}`;
    } catch {
      return dateString;
    }
  };

  const toggleShowAll = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleCopyId = async (orderId: string) => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopiedId(orderId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignore clipboard write failures
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Clock size={13} className="shrink-0" />
            {t('statuses.pending')}
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
            <XCircle size={13} className="shrink-0" />
            {t('statuses.cancelled')}
          </span>
        );
      case 'PROCESSING':
      case 'SHIPPED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
            <Truck size={13} className="shrink-0" />
            {status}
          </span>
        );
      case 'DELIVERED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={13} className="shrink-0" />
            {t('statuses.done')}
          </span>
        );
    }
  };

  // Empty State
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 sm:p-16 rounded-3xl border border-border-muted/80 bg-card shadow-xs my-6">
        <div className="size-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5 ring-8 ring-primary/5">
          <PackageOpen size={36} />
        </div>

        <h3 className="text-2xl font-bold text-text-primary mb-2">
          {t('empty')}
        </h3>

        <p className="text-text-muted text-sm sm:text-base max-w-md mb-6 leading-relaxed">
          {t('emptySubtitle')}
        </p>

        <Link href="/products">
          <Button
            size="lg"
            className="gap-2 rounded-full px-7 shadow-sm"
          >
            <span>{t('startShopping')}</span>
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="flex flex-col gap-6 sm:gap-8"
    >
      {orders.map((order) => {
        const isExpanded = expandedOrders[order.id] ?? false;
        const totalItemsCount = order.orderItems?.length ?? 0;
        const visibleItems = isExpanded
          ? order.orderItems
          : order.orderItems?.slice(0, 2);
        const hasMoreItems = totalItemsCount > 2;

        return (
          <article
            key={order.id}
            className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border-muted/80 bg-card shadow-xs hover:shadow-md transition-shadow duration-300"
          >
            {/* Header: ID, Date, Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6 sm:py-4.5 bg-bg-muted/40 border-b border-border-muted/60">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyId(order.id)}
                  title={
                    copiedId === order.id ? t('copied') : t('copyId')
                  }
                  className="group flex items-center gap-1.5 px-3 py-1 rounded-lg bg-bg-plain border border-border-muted/80 text-xs sm:text-sm font-semibold text-text-primary hover:border-primary/50 transition-colors"
                >
                  <span className="text-text-muted">#</span>
                  <span>{order.id.slice(0, 8)}</span>
                  {copiedId === order.id ? (
                    <Check
                      size={13}
                      className="text-emerald-500 ms-0.5"
                    />
                  ) : (
                    <Copy
                      size={13}
                      className="text-text-muted group-hover:text-primary ms-0.5 transition-colors"
                    />
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-text-muted">
                  <Calendar size={14} className="shrink-0" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {order.paymentStatus === 'PAID' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    <Check size={12} />
                    {t('paid')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {t('unpaid')}
                  </span>
                )}
                {renderStatusBadge(order.status)}
              </div>
            </div>

            {/* Summary strip: Total, Payment Method, Items count */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 bg-card border-b border-border-muted/40">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  {t('totalPrice')}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                  {order.total}{' '}
                  <span className="text-sm sm:text-base font-semibold text-text-muted">
                    {t('currency')}
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-muted/70 text-xs sm:text-sm font-medium text-text-primary">
                  {order.paymentMethod === 'CASH_ON_DELIVERY' ? (
                    <Banknote size={15} className="text-text-muted" />
                  ) : (
                    <CreditCard
                      size={15}
                      className="text-text-muted"
                    />
                  )}
                  <span>
                    {order.paymentMethod === 'CASH_ON_DELIVERY'
                      ? t('cash')
                      : t('creditCard')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-muted/70 text-xs sm:text-sm font-medium text-text-primary">
                  <Package size={15} className="text-text-muted" />
                  <span>
                    {totalItemsCount === 1
                      ? t('itemCount')
                      : t('itemsCount', { count: totalItemsCount })}
                  </span>
                </div>
              </div>
            </div>

            {/* Products grid with progressive disclosure */}
            <div className="relative p-4 sm:p-6 bg-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {visibleItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 sm:gap-4 p-3 rounded-2xl border border-border-muted/70 bg-bg-muted/20 hover:bg-bg-muted/50 transition-colors group"
                  >
                    <div className="relative size-20 sm:size-22 rounded-xl overflow-hidden shrink-0 bg-bg-muted border border-border-muted/80">
                      <Image
                        src={item.product?.cover || '/Logo.svg'}
                        alt={item.product?.title || 'Product'}
                        fill
                        sizes="88px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-text-primary line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                          {item.product?.title}
                        </h4>
                      </div>

                      <div className="flex items-baseline justify-between gap-2 mt-2">
                        <span className="text-xs font-semibold text-text-muted bg-card px-2 py-0.5 rounded-md border border-border-muted/60">
                          × {item.quantity}
                        </span>

                        <span className="text-base sm:text-lg font-bold text-text-primary">
                          {item.price}{' '}
                          <span className="text-xs font-normal text-text-muted">
                            {t('currency')}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show more overlay gradient (fixed from typo) */}
              {!isExpanded && hasMoreItems && (
                <div className="absolute inset-x-0 bottom-0 h-24 flex items-end justify-center pb-2 bg-gradient-to-t from-card via-card/90 to-transparent pointer-events-none">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleShowAll(order.id)}
                    className="pointer-events-auto gap-1.5 rounded-full shadow-xs bg-card hover:bg-bg-muted"
                  >
                    <span>{t('showAll')}</span>
                    <span className="text-xs text-text-muted">
                      ({totalItemsCount})
                    </span>
                    <ChevronDown size={15} />
                  </Button>
                </div>
              )}

              {/* Show less button */}
              {isExpanded && hasMoreItems && (
                <div className="flex justify-center mt-5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleShowAll(order.id)}
                    className="gap-1.5 text-text-muted hover:text-text-primary rounded-full"
                  >
                    <span>{t('showLess')}</span>
                    <ChevronUp size={15} />
                  </Button>
                </div>
              )}
            </div>

            {/* Footer Breakdown: Subtotal, Discount, Shipping */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-bg-muted/30 border-t border-border-muted/50 text-xs text-text-muted">
              <div className="flex flex-wrap items-center gap-4">
                <span>
                  {t('subtotal')}:{' '}
                  <strong className="text-text-primary font-semibold">
                    {order.subtotal ?? order.total} {t('currency')}
                  </strong>
                </span>

                {Number(order.discount || 0) > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('discount')}: -{order.discount} {t('currency')}
                  </span>
                )}

                {order.shipping && (
                  <span>
                    {t('shipping')}:{' '}
                    <strong className="text-text-primary font-semibold">
                      {Number(order.shipping) === 0
                        ? t('free')
                        : `${order.shipping} ${t('currency')}`}
                    </strong>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 text-text-muted">
                  <Truck size={14} />
                  <span>
                    {t('deliveryStatus')}:{' '}
                    <strong className="text-text-primary capitalize">
                      {order.status === 'PENDING'
                        ? t('statuses.pending')
                        : order.status === 'CANCELLED'
                          ? t('statuses.cancelled')
                          : t('statuses.done')}
                    </strong>
                  </span>
                </div>

                <Link href={`/orders/${order.id}`}>
                  <Button
                    variant="outline"
                    size="xs"
                    className="gap-1 rounded-full text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                  >
                    <span>{t('viewOrder')}</span>
                    <ArrowRight className="size-3 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        );
      })}

      {/* Pagination: Error */}
      {isFetchNextPageError && (
        <div className="flex flex-col items-center gap-2 my-4">
          <p className="text-destructive text-sm text-center">
            {t('loadMoreError')}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="gap-2"
          >
            <RefreshCw
              size={14}
              className={isFetchingNextPage ? 'animate-spin' : ''}
            />
            {isFetchingNextPage ? t('loading') : t('tryAgain')}
          </Button>
        </div>
      )}

      {/* Pagination: Load More */}
      {hasNextPage && !isFetchNextPageError && (
        <div className="flex justify-center my-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="gap-2 rounded-full px-8 shadow-xs hover:border-primary"
          >
            {isFetchingNextPage && (
              <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
            {isFetchingNextPage ? t('loading') : t('loadMore')}
          </Button>
        </div>
      )}

      {/* Pagination: End of List */}
      {!hasNextPage && orders.length > 0 && (
        <p className="text-center text-xs text-text-muted my-4">
          {t('noMoreOrders')}
        </p>
      )}
    </div>
  );
}
