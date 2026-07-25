export interface Product {
  id: string | number;
  title: string;
  cover?: string;
  image?: string;
  price: number;
  discountPrice?: number;
  rating?: number;
  isNew?: boolean;
  isHot?: boolean;
  outOfStock?: boolean;
}
