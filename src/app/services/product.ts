import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductDetail } from '../models/product-detail';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:5001/api/Products';

  constructor(private http: HttpClient) {}

  getProducts(filters?: {
  search?: string;
  brandId?: number | null;
  categoryId?: number | null;
  scaleId?: number | null;
  seriesId?: number | null;
  inStockOnly?: boolean;
}): Observable<Product[]> {

  let params = new HttpParams();

  if (filters) {

    if (filters.search?.trim()) {
      params = params.set(
        'search',
        filters.search.trim()
      );
    }

    if (
      filters.brandId !== null &&
      filters.brandId !== undefined
    ) {
      params = params.set(
        'brandId',
        filters.brandId.toString()
      );
    }

    if (
      filters.categoryId !== null &&
      filters.categoryId !== undefined
    ) {
      params = params.set(
        'categoryId',
        filters.categoryId.toString()
      );
    }

    if (
      filters.scaleId !== null &&
      filters.scaleId !== undefined
    ) {
      params = params.set(
        'scaleId',
        filters.scaleId.toString()
      );
    }

    if (
      filters.seriesId !== null &&
      filters.seriesId !== undefined
    ) {
      params = params.set(
        'seriesId',
        filters.seriesId.toString()
      );
    }

    if (filters.inStockOnly === true) {
      params = params.set(
        'inStockOnly',
        'true'
      );
    }
  }

  return this.http.get<Product[]>(
    this.apiUrl,
    { params }
  );
}

  getProduct(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(
      `${this.apiUrl}/${id}`
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.apiUrl,
      product
    );
  }

  updateProduct(id: number, product: Product) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      product
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  uploadProductImages(
    productId: number,
    files: File[]
  ) {

    const formData = new FormData();

    for (const file of files) {
      formData.append('files', file);
    }

    return this.http.post(
      `https://localhost:5001/api/ProductImages/upload-multiple/${productId}`,
      formData
    );
  }
}