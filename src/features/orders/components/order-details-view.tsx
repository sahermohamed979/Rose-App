'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  FileText,
  HelpCircle,
  MapPin,
  Package,
  Phone,
  Truck,
  XCircle,
} from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { OrderTimeline } from './order-timeline';
import type { Order } from '../types/order-types';

interface OrderDetailsViewProps {
  order: Order;
}

export function OrderDetailsView({ order }: OrderDetailsViewProps) {
  // Translations
  const t = useTranslations('orders');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  // State
  const [copiedId, setCopiedId] = useState(false);

  // Functions
  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      // Ignore copy error
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const dateLocale = locale === 'ar' ? 'ar-EG' : 'en-GB';

      return `${date.toLocaleDateString(dateLocale, {
        day: 'numeric',
        month: 'long',
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

  const totalItemsCount =
    order.orderItems?.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    ) ??
    order.orderItems?.length ??
    0;

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
    >
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 text-xs sm:text-sm text-text-muted flex items-center gap-2"
      >
        <Link
          href="/"
          className="hover:text-primary transition-colors"
        >
          {tCommon('home')}
        </Link>
        <span>/</span>
        <Link
          href="/orders"
          className="hover:text-primary transition-colors"
        >
          {t('title')}
        </Link>
        <span>/</span>
        <span className="text-text-primary font-medium">
          #{order.id.slice(0, 8)}
        </span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border-muted/60">
        <div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-muted hover:text-primary transition-colors mb-2"
          >
            {locale === 'ar' ? (
              <ArrowRight className="size-4" />
            ) : (
              <ArrowLeft className="size-4" />
            )}
            <span>{t('backToOrders')}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {t('orderDetails')}
            </h1>

            <button
              type="button"
              onClick={handleCopyId}
              title={copiedId ? t('copied') : t('copyId')}
              className="group flex items-center gap-1.5 px-3 py-1 rounded-lg bg-bg-muted/70 border border-border-muted/80 text-xs sm:text-sm font-semibold text-text-primary hover:border-primary/50 transition-colors"
            >
              <span className="text-text-muted">#</span>
              <span>{order.id.slice(0, 8)}</span>
              {copiedId ? (
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
          </div>

          <div className="flex items-center gap-2 mt-1.5 text-xs sm:text-sm text-text-muted">
            <Calendar size={14} className="shrink-0" />
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2">
          {order.paymentStatus === 'PAID' ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <Check size={12} />
              {t('paid')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {t('unpaid')}
            </span>
          )}
          {renderStatusBadge(order.status)}
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="mb-6 sm:mb-8">
        <OrderTimeline status={order.status} />
      </div>

      {/* Main 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column: Items & Delivery Details (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items Card */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-muted/80 bg-card shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-muted/60">
              <div className="flex items-center gap-2">
                <Package className="size-5 text-primary" />
                <h3 className="font-bold text-base sm:text-lg text-text-primary">
                  {t('orderItems')}
                </h3>
              </div>
              <span className="text-xs font-semibold text-text-muted bg-bg-muted/70 px-2.5 py-1 rounded-full">
                {totalItemsCount === 1
                  ? t('itemCount')
                  : t('itemsCount', { count: totalItemsCount })}
              </span>
            </div>

            <div className="divide-y divide-border-muted/60">
              {order.orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0 group"
                >
                  <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden shrink-0 bg-bg-muted border border-border-muted/80">
                    <Image
                      src={item.product?.cover || '/Logo.svg'}
                      alt={item.product?.title || 'Product'}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      {item.productId ? (
                        <Link
                          href={`/products/${item.productId}`}
                          className="font-semibold text-sm sm:text-base text-text-primary hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.product?.title}
                        </Link>
                      ) : (
                        <h4 className="font-semibold text-sm sm:text-base text-text-primary line-clamp-2">
                          {item.product?.title}
                        </h4>
                      )}
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-2 mt-2">
                      <span className="text-xs font-semibold text-text-muted bg-bg-muted/70 px-2.5 py-0.5 rounded-md border border-border-muted/60">
                        {item.quantity} × {item.price} {t('currency')}
                      </span>

                      <span className="text-base sm:text-lg font-bold text-text-primary">
                        {(
                          Number(item.price) * (item.quantity || 1)
                        ).toFixed(2)}{' '}
                        <span className="text-xs font-normal text-text-muted">
                          {t('currency')}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Shipping Info Card */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-muted/80 bg-card shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-muted/60">
              <MapPin className="size-5 text-primary" />
              <h3 className="font-bold text-base sm:text-lg text-text-primary">
                {t('deliveryAddress')}
              </h3>
            </div>

            {order.address ? (
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-text-primary">
                  {order.address.street || order.address.details}
                </p>
                {order.address.city && (
                  <p className="text-text-muted">
                    {order.address.city}
                    {order.address.state
                      ? `, ${order.address.state}`
                      : ''}
                  </p>
                )}
                {order.address.phone && (
                  <div className="flex items-center gap-2 text-text-muted pt-1">
                    <Phone className="size-4 shrink-0" />
                    <span dir="ltr">{order.address.phone}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-text-muted">
                {t('noAddressProvided')}
              </p>
            )}

            {/* Tracking number if present */}
            {order.trackingNumber && (
              <div className="mt-4 pt-4 border-t border-border-muted/60 flex items-center gap-2 text-sm">
                <Truck className="size-4 text-primary shrink-0" />
                <span className="text-text-muted">
                  {t('tracking')}:
                </span>
                <span className="font-mono font-semibold text-text-primary">
                  {order.trackingNumber}
                </span>
              </div>
            )}

            {/* Notes if present */}
            {order.notes && (
              <div className="mt-4 pt-4 border-t border-border-muted/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase mb-1">
                  <FileText className="size-3.5" />
                  <span>{t('notes')}</span>
                </div>
                <p className="text-sm text-text-primary bg-bg-muted/40 p-3 rounded-xl border border-border-muted/60">
                  {order.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Actions (1 col on large screen) */}
        <div className="space-y-6">
          {/* Order Summary Card */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-muted/80 bg-card shadow-xs">
            <h3 className="font-bold text-base sm:text-lg text-text-primary mb-4 pb-3 border-b border-border-muted/60">
              {t('orderSummary')}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>{t('subtotal')}</span>
                <span className="font-semibold text-text-primary">
                  {order.subtotal ?? order.total} {t('currency')}
                </span>
              </div>

              {Number(order.discount || 0) > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>{t('discount')}</span>
                  <span className="font-semibold">
                    -{order.discount} {t('currency')}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-text-muted">
                <span>{t('shipping')}</span>
                <span className="font-semibold text-text-primary">
                  {Number(order.shipping || 0) === 0
                    ? t('free')
                    : `${order.shipping} ${t('currency')}`}
                </span>
              </div>

              <div className="pt-3 border-t border-border-muted/60 flex justify-between items-baseline">
                <span className="font-bold text-base text-text-primary">
                  {t('totalPrice')}
                </span>
                <span className="text-2xl font-extrabold text-primary">
                  {order.total}{' '}
                  <span className="text-xs font-normal text-text-muted">
                    {t('currency')}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-muted/80 bg-card shadow-xs">
            <h3 className="font-bold text-base text-text-primary mb-3">
              {t('paymentDetails')}
            </h3>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-bg-muted/40 border border-border-muted/60 text-sm">
              <div className="size-10 rounded-xl bg-card border border-border-muted/80 flex items-center justify-center shrink-0">
                {order.paymentMethod === 'CASH_ON_DELIVERY' ? (
                  <Banknote className="size-5 text-primary" />
                ) : (
                  <CreditCard className="size-5 text-primary" />
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-text-primary">
                  {order.paymentMethod === 'CASH_ON_DELIVERY'
                    ? t('cash')
                    : t('creditCard')}
                </span>
                <span className="text-xs text-text-muted">
                  {order.paymentStatus === 'PAID'
                    ? t('paid')
                    : t('unpaid')}
                </span>
              </div>
            </div>
          </div>

          {/* Need Help Concierge Card */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm">
              <HelpCircle className="size-4 shrink-0" />
              <span>{t('needHelp')}</span>
            </div>
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              {t('subtitle')}
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground shadow-xs"
              >
                {t('contactSupport')}
              </Button>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <Link href="/products" className="w-full">
              <Button
                size="lg"
                className="w-full rounded-full gap-2 shadow-xs"
              >
                <span>{t('continueShopping')}</span>
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Button>
            </Link>

            <Link href="/orders" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full gap-2"
              >
                {t('viewAllOrders')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
