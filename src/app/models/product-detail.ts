export interface ProductDetail {
  productId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  isAvailable: boolean;
  images: string[];
}