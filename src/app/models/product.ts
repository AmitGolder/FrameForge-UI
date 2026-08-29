export interface Product {

  productId: number;

  name: string;

  description: string;

  price: number;

  stockQuantity: number;

  isAvailable: boolean;

  images: string[];


  // Brand
  brandId?: number | null;
  brandName?: string | null;


  // Scale
  scaleId?: number | null;
  scaleName?: string | null;


  // Category
  categoryId?: number | null;
  categoryName?: string | null;


  // Series
  seriesId?: number | null;
  seriesName?: string | null;

}