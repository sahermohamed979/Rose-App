export interface AddNewProduct {
  title: string;
  description: string;
  stock: number;
  price: number;
  discountType: 'PERCENT';
  discountValue: number;
  categoryId: string;
  occasionId?: string;
  cover: string;
  gallery: string[];
}
