export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;

  createdAt: string;

  product: {
    id: string;
    title: string;
    cover: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  addressId: string;
  couponId: string | null;

  status:
    | 'PENDING'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED';

  paymentMethod: 'CASH_ON_DELIVERY' | 'CREDIT_CARD';

  paymentStatus: 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED';

  stripePaymentIntentId: string | null;
  stripeCheckoutSessionId: string | null;

  subtotal: string;
  discount: string;
  shipping: string;
  total: string;

  trackingNumber: string | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;

  orderItems: OrderItem[];
}

export interface OrderMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersSuccess {
  status: true;
  code: number;

  payload: {
    data: Order[];
    metadata: OrderMetadata;
  };
}

export interface OrderError {
  status: false;
  code: number;
  message: string;
}

export type OrdersResponse = OrdersSuccess | OrderError;
