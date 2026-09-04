import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product';
import { ToastService } from '../../services/toast';

import { BrandService } from '../../services/brand';
import { ScaleService } from '../../services/scale';
import { CategoryService } from '../../services/category';
import { SeriesService } from '../../services/series';

import { Product } from '../../models/product';
import { Brand } from '../../models/brand';
import { Scale } from '../../models/scale';
import { Category } from '../../models/category';
import { Series } from '../../models/series';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.css']
})
export class EditProductComponent implements OnInit {

  product: Product = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    isAvailable: false,
    images: [],
    brandId: null,
    scaleId: null,
    categoryId: null,
    seriesId: null
  };

  brands: Brand[] = [];
  scales: Scale[] = [];
  categories: Category[] = [];
  series: Series[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private productService: ProductService,
    private brandService: BrandService,
    private scaleService: ScaleService,
    private categoryService: CategoryService,
    private seriesService: SeriesService
  ) { }

  ngOnInit(): void {
    this.loadCatalogData();
    this.loadProduct();
  }

  loadCatalogData(): void {

    this.brandService.getBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (err) => {
        console.error('Failed to load brands:', err);
      }
    });

    this.scaleService.getScales().subscribe({
      next: (data) => {
        this.scales = data;
      },
      error: (err) => {
        console.error('Failed to load scales:', err);
      }
    });

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  loadProduct(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.productService.getProduct(id)
      .subscribe({
        next: (data) => {

          console.log('Loaded Product:', data);

          this.product = data;

          if (this.product.brandId) {
            this.loadSeries(
              this.product.brandId
            );
          }
        },
        error: (err) => {
          console.error(err);
          this.toastService.show('Failed to load product');
        }
      });
  }

  loadSeries(brandId: number): void {

    this.seriesService
      .getSeriesByBrand(brandId)
      .subscribe({
        next: (data) => {
          this.series = data;
        },
        error: (err) => {
          console.error(
            'Failed to load series:',
            err
          );
        }
      });
  }

  onBrandChange(): void {

    this.product.seriesId = null;
    this.series = [];

    if (!this.product.brandId) {
      return;
    }

    this.loadSeries(this.product.brandId);
  }

  updateProduct(): void {
    if (!this.product.name.trim() || !this.product.description.trim() || this.product.price <= 0) {
      this.toastService.show('Please fill all required fields');
      return;
    }

    if (this.product.stockQuantity < 0) {
      this.toastService.show('Stock quantity cannot be negative');
      return;
    }

    // Keep frontend data consistent too
    this.product.isAvailable =
      this.product.stockQuantity > 0;

    this.productService
      .updateProduct(
        this.product.productId,
        this.product
      )
      .subscribe({

        next: () => {

          this.toastService.show(
            'Product Updated Successfully'
          );

          this.router.navigate([
            '/admin/products'
          ]);
        },

        error: (err) => {

          console.error(err);

          this.toastService.show(
            'Failed to update product'
          );
        }
      });
  }
}