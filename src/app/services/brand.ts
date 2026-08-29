import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl =
    'https://localhost:5001/api/Brands';

  constructor(
    private http: HttpClient
  ) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(
      this.apiUrl
    );
  }

  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(
      `${this.apiUrl}/${id}`
    );
  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(
      this.apiUrl,
      brand
    );
  }

  updateBrand(
    id: number,
    brand: Brand
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      brand
    );
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}