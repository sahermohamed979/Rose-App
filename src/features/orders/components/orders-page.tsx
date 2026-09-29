'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  Banknote,
  Check,
  ChevronDown,
  CreditCard,
  Truck,
} from 'lucide-react';

import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { OrdersResponse } from '../types/order-types';

interface orderPageType {
  initialData: OrdersResponse;
}

export default function OrderPage({ initialData }: orderPageType) {
  const t = useTranslations('orders');
  const locale = useLocale();

  const [expandedOrders, setExpandedOrders] = useState<
    Record<string, boolean>
  >({});

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

      const data: OrdersResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.status === false
            ? data.message
            : 'Something went wrong'
        );
      }

      return data;
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

  const orders =
    data?.pages.flatMap((page) => {
      if (page.status === false) {
        return [];
      }

      return page.payload.data;
    }) ?? [];

  // Format date according to current language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const dateLocale = locale === 'ar' ? 'ar-EG' : 'en-GB';

    return `${date.toLocaleDateString(dateLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })} ${t('at')} ${date.toLocaleTimeString(dateLocale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: locale === 'en',
    })}`;
  };

  // Toggle Show All for a specific order
  const toggleShowAll = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <>
      <div
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className="flex flex-col gap-10"
      >
        {orders.map((order) => {
          const showAll = expandedOrders[order.id] ?? false;

          return (
            <div key={order.id}>
              {/* ==================== ORDER HEADER ==================== */}

              <div className="flex justify-between text-text-inverse bg-maroon-600 p-4 rounded-t-2xl">
                <div className="text-2xl font-semibold">
                  <p>#{order.id.slice(0, 8)}</p>
                </div>

                <p className="text-[16px]">
                  {t('createdIn')}:{' '}
                  <span className="text-[16px] font-semibold">
                    {formatDate(order.createdAt)}
                  </span>
                </p>
              </div>

              {/* ==================== ORDER BODY ==================== */}

              <div className="bg-bg-muted p-4 rounded-b-2xl">
                {/* ==================== ORDER DETAILS ==================== */}

                <div className="mt-4 flex justify-between items-center">
                  {/* Total Price + Payment Status */}

                  <div className="flex items-center">
                    <p className="text-2xl font-medium text-text-plain">
                      {t('totalPrice')}:{' '}
                      <span className="text-2xl font-semibold text-text-plain">
                        {order.total} {t('currency')}
                      </span>
                    </p>

                    {/* Paid */}

                    {order.paymentStatus === 'PAID' && (
                      <div className="bg-bg-success rounded-full ms-4 flex py-1 px-2.5 text-text-inverse justify-center items-center gap-2.5">
                        <Check size={20} />

                        <p>{t('paid')}</p>
                      </div>
                    )}
                  </div>

                  {/* Order Status */}

                  <div>
                    <div className="flex gap-2.5 items-center">
                      <p>{t('status')}:</p>

                      {order.status === 'PENDING' ? (
                        <p className="bg-blue-500 text-text-inverse rounded-full text-[13px] px-2.5 py-1">
                          {t('statuses.pending')}
                        </p>
                      ) : order.status === 'CANCELLED' ? (
                        <p className="bg-bg-danger text-text-inverse rounded-full text-[13px] px-2.5 py-1">
                          {t('statuses.cancelled')}
                        </p>
                      ) : (
                        <p className="bg-bg-success text-text-inverse rounded-full text-[13px] px-2.5 py-1">
                          {t('statuses.done')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mt-2.5 mb-3.5" />

                {/* ==================== PAYMENT & DELIVERY ==================== */}

                <div className="p-4">
                  <div className="gap-2">
                    {/* Payment Method */}

                    <div className="flex items-center gap-2">
                      <p className="text-[16px] font-semibold">
                        {t('paymentMethod')}:
                      </p>

                      {order.paymentMethod === 'CASH_ON_DELIVERY' ? (
                        <Banknote
                          size={18}
                          className="text-text-muted"
                        />
                      ) : (
                        <CreditCard
                          size={18}
                          className="text-text-muted"
                        />
                      )}

                      <p className="text-text-muted text-sm">
                        {order.paymentMethod === 'CASH_ON_DELIVERY'
                          ? t('cash')
                          : t('creditCard')}
                      </p>
                    </div>

                    {/* Delivery Status */}

                    <div className="flex items-center gap-2 mt-2.5">
                      <p className="text-[16px] font-semibold">
                        {t('deliveryStatus')}:
                      </p>

                      <Truck size={18} className="text-yellow-600" />

                      <p
                        className={`text-sm font-medium ${
                          order.status === 'PENDING'
                            ? 'text-yellow-600'
                            : order.status === 'CANCELLED'
                              ? 'text-text-danger'
                              : 'text-text-success'
                        }`}
                      >
                        {order.status === 'PENDING'
                          ? t('statuses.pending')
                          : order.status === 'CANCELLED'
                            ? t('statuses.cancelled')
                            : t('statuses.done')}
                      </p>
                    </div>
                  </div>

                  {/* ==================== ORDER ITEMS ==================== */}

                  <p className="text-[16px] font-semibold my-2.5">
                    {t('orderItems')}:
                  </p>

                  <div className="relative bg-bg-plain p-4 rounded-lg overflow-hidden">
                    {/* Products */}

                    <div className="grid grid-cols-4 gap-3.5">
                      {order.orderItems.map((item, index) => {
                        /**
                         * Only products starting from the third
                         * are blurred when Show All is false.
                         */

                        const isPreview = index >= 2 && !showAll;

                        return (
                          <div
                            key={item.id}
                            className={`col-span-2 relative overflow-hidden rounded-lg ${
                              isPreview ? 'blur-[2px]' : ''
                            }`}
                          >
                            <div className="flex gap-3.5">
                              {/* Product Image */}

                              <div>
                                <Image
                                  src={item.product.cover}
                                  alt={item.product.title}
                                  width={180}
                                  height={180}
                                  className="w-45 h-52.5 object-cover rounded-s-lg"
                                />
                              </div>

                              {/* Product Information */}

                              <div className="flex flex-col justify-between">
                                <div>
                                  <p className="font-semibold text-xl text-text-primary">
                                    {item.product.title}
                                  </p>
                                </div>

                                {/* Quantity + Price */}

                                <div className="flex items-center gap-1">
                                  <p className="text-text-primary text-sm mt-1.5">
                                    (x{item.quantity})
                                  </p>

                                  <p className="text-2xl font-bold">
                                    {item.price}

                                    <span className="text-xl font-medium ms-1.5">
                                      {t('currency')}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ==================== SHOW ALL OVERLAY ==================== */}

                    {!showAll && order.orderItems.length > 2 && (
                      <div className="absolute inset-x-0 bottom-0 h-32 flex items-center justify-center bg-lonear-to-t from-bg-plain via-bg-plain to-transparent">
                        <button
                          type="button"
                          onClick={() => toggleShowAll(order.id)}
                          className="flex flex-col items-center text-maroon-600 hover:opacity-80 transition"
                        >
                          <span className="font-medium">
                            {t('showAll')}
                          </span>

                          <ChevronDown size={24} />
                        </button>
                      </div>
                    )}

                    {/* ==================== SHOW LESS ==================== */}

                    {showAll && order.orderItems.length > 2 && (
                      <div className="flex justify-center mt-5">
                        <button
                          type="button"
                          onClick={() => toggleShowAll(order.id)}
                          className="flex flex-col items-center text-maroon-600 hover:opacity-80 transition"
                        >
                          <span className="font-medium">
                            {t('showLess')}
                          </span>

                          <ChevronDown
                            size={24}
                            className="rotate-180"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ==================== PAGE 2+ ERROR ==================== */}

        {isFetchNextPageError && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-text-danger text-center">
              {t('loadMoreError')}
            </p>

            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-5 py-2 rounded-lg bg-maroon-600 text-text-inverse"
            >
              {isFetchingNextPage ? t('loading') : t('tryAgain')}
            </Button>
          </div>
        )}

        {/* ==================== LOAD MORE ==================== */}

        {hasNextPage && !isFetchNextPageError && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mx-auto px-5 py-2 rounded-lg bg-maroon-600 text-text-inverse disabled:opacity-50"
          >
            {isFetchingNextPage ? t('loading') : t('loadMore')}
          </Button>
        )}

        {/* ==================== NO MORE ORDERS ==================== */}

        {!hasNextPage && orders.length > 0 && (
          <p className="text-center">{t('noMoreOrders')}</p>
        )}
      </div>
    </>
  );
}
