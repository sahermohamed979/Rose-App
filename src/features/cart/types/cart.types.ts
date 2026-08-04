// Coupon

export interface CouponApiItem {
  id: string;
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: string;
  minPurchase?: string;
  maxDiscount?: string;
  usageLimit?: number;
  usedCount?: number;
  validFrom?: string;
  validUntil?: string;
  isActive: boolean;
}

export interface CouponsPayload {
  data: CouponApiItem[];
  metadata?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CouponResult {
  code: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  /** Computed monetary amount to subtract from the subtotal */
  discountAmount: number;
}

export interface ApplyCouponPayload {
  coupon: CouponResult;
}

// Cart Summary Totals (computed locally)

export interface CartSummaryTotals {
  subtotal: number;
  discount: number;
  total: number;
}

