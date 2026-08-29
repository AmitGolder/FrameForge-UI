import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '../../services/toast';
import { ProductService } from '../../services/product';

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
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProductComponent implements OnInit {

  product: Product = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    stockQuantity: 1,
    isAvailable: true,
    images: [],

    brandId: null,
    scaleId: null,
    categoryId: null,
    seriesId: null
  };

  selectedFiles: File[] = [];

  brands: Brand[] = [];
  scales: Scale[] = [];
  categories: Category[] = [];
  series: Series[] = [];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private scaleService: ScaleService,
    private categoryService: CategoryService,
    private seriesService: SeriesService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCatalogData();
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

  onBrandChange(): void {

    this.product.seriesId = null;
    this.series = [];

    if (!this.product.brandId) {
      return;
    }

    this.seriesService
      .getSeriesByBrand(this.product.brandId)
      .subscribe({
        next: (data) => {
          this.series = data;
        },
        error: (err) => {
          console.error('Failed to load series:', err);
        }
      });
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    console.log('Selected Files:', this.selectedFiles);
  }

  saveProduct(): void {

    if (
      !this.product.name.trim() ||
      !this.product.description.trim() ||
      this.product.price <= 0
    ) {
      this.toastService.show('Please fill all required fields');
      return;
    }

    this.productService.addProduct(this.product)
      .subscribe({
        next: (createdProduct) => {

          console.log(
            'Created Product:',
            createdProduct
          );

          if (this.selectedFiles.length > 0) {

            this.productService
              .uploadProductImages(
                createdProduct.productId,
                this.selectedFiles
              )
              .subscribe({
                next: (response) => {

                  console.log(
                    'UPLOAD SUCCESS:',
                    response
                  );

                  this.toastService.show(
                    'Product and Images Added Successfully'
                  );

                  this.router.navigate(
                    ['/admin/products']
                  );
                },

                error: (err) => {

                  console.error(
                    'UPLOAD ERROR:',
                    err
                  );

                  this.toastService.show(
                    'Product added but image upload failed'
                  );
                }
              });

          } else {

            this.toastService.show(
              'Product Added Successfully'
            );

            this.router.navigate(
              ['/admin/products']
            );
          }
        },

        error: (err) => {

          console.error(err);

          this.toastService.show(
            'Failed to add product'
          );
        }
      });
  }
}