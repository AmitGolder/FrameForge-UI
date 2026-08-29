import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product';
import { BrandService } from '../../services/brand';
import { CategoryService } from '../../services/category';
import { ScaleService } from '../../services/scale';
import { SeriesService } from '../../services/series';

import { Product } from '../../models/product';
import { Brand } from '../../models/brand';
import { Category } from '../../models/category';
import { Scale } from '../../models/scale';
import { Series } from '../../models/series';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent
  implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  brands: Brand[] = [];
  categories: Category[] = [];
  scales: Scale[] = [];
  series: Series[] = [];

  searchTerm = '';

  selectedBrandId: number | null = null;
  selectedCategoryId: number | null = null;
  selectedScaleId: number | null = null;
  selectedSeriesId: number | null = null;

  inStockOnly = false;

  sortOption = '';

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private scaleService: ScaleService,
    private seriesService: SeriesService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadBrands();
    this.loadCategories();
    this.loadScales();

    this.loadProducts();
  }

  loadProducts(): void {

    this.productService.getProducts({
      search: this.searchTerm,
      brandId: this.selectedBrandId,
      categoryId: this.selectedCategoryId,
      scaleId: this.selectedScaleId,
      seriesId: this.selectedSeriesId,
      inStockOnly: this.inStockOnly
    })
    .subscribe({

      next: (data: Product[]) => {

        this.products = data;
        this.filteredProducts = [...data];

        this.sortProducts();

        this.cdr.detectChanges();
      },

      error: (err: any) => {
        console.error(
          'Failed to load products:',
          err
        );
      }

    });
  }

  loadBrands(): void {

    this.brandService
      .getBrands()
      .subscribe({

        next: (data: Brand[]) => {
          this.brands = data;
        },

        error: (err: any) => {
          console.error(
            'Failed to load brands:',
            err
          );
        }

      });
  }

  loadCategories(): void {

    this.categoryService
      .getCategories()
      .subscribe({

        next: (data: Category[]) => {
          this.categories = data;
        },

        error: (err: any) => {
          console.error(
            'Failed to load categories:',
            err
          );
        }

      });
  }

  loadScales(): void {

    this.scaleService
      .getScales()
      .subscribe({

        next: (data: Scale[]) => {
          this.scales = data;
        },

        error: (err: any) => {
          console.error(
            'Failed to load scales:',
            err
          );
        }

      });
  }

  onBrandChange(): void {

    this.selectedSeriesId = null;
    this.series = [];

    if (this.selectedBrandId) {

      this.seriesService
        .getSeriesByBrand(
          this.selectedBrandId
        )
        .subscribe({

          next: (data: Series[]) => {
            this.series = data;
          },

          error: (err: any) => {
            console.error(
              'Failed to load series:',
              err
            );
          }

        });
    }

    this.loadProducts();
  }

  applyFilters(): void {

    this.loadProducts();
  }

  clearFilters(): void {

    this.searchTerm = '';

    this.selectedBrandId = null;
    this.selectedCategoryId = null;
    this.selectedScaleId = null;
    this.selectedSeriesId = null;

    this.inStockOnly = false;

    this.sortOption = '';

    this.series = [];

    this.loadProducts();
  }

  sortProducts(): void {

    if (
      this.sortOption === 'lowToHigh'
    ) {
      this.filteredProducts.sort(
        (a, b) =>
          a.price - b.price
      );
    }

    if (
      this.sortOption === 'highToLow'
    ) {
      this.filteredProducts.sort(
        (a, b) =>
          b.price - a.price
      );
    }

    if (
      this.sortOption === 'aToZ'
    ) {
      this.filteredProducts.sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      );
    }

    if (
      this.sortOption === 'zToA'
    ) {
      this.filteredProducts.sort(
        (a, b) =>
          b.name.localeCompare(a.name)
      );
    }
  }

  onSortChange(): void {

    this.sortProducts();

    this.cdr.detectChanges();
  }

  viewDetails(id: number): void {

    this.router.navigate([
      '/product',
      id
    ]);
  }

  getImageUrl(
    imageName: string
  ): string {

    return `https://localhost:5001/images/products/${imageName}`;
  }
}