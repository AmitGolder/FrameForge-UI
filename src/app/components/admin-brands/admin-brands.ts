import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrandService } from '../../services/brand';
import { ToastService } from '../../services/toast';
import { Brand } from '../../models/brand';

@Component({
  selector: 'app-admin-brands',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-brands.html',
  styleUrls: ['./admin-brands.css']
})
export class AdminBrandsComponent
  implements OnInit {

  brands: Brand[] = [];

  brandName = '';

  editingBrandId: number | null = null;

  constructor(
    private brandService: BrandService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {

    this.brandService
      .getBrands()
      .subscribe({
        next: (data) => {
          this.brands = data;
        },

        error: (err) => {
          console.error(err);

          this.toastService.show(
            'Failed to load brands'
          );
        }
      });
  }

  saveBrand(): void {

    if (!this.brandName.trim()) {

      this.toastService.show(
        'Please enter a brand name'
      );

      return;
    }

    if (this.editingBrandId === null) {

      const brand: Brand = {
        brandId: 0,
        name: this.brandName.trim()
      };

      this.brandService
        .addBrand(brand)
        .subscribe({
          next: () => {

            this.toastService.show(
              'Brand added successfully'
            );

            this.resetForm();

            this.loadBrands();
          },

          error: (err) => {

            console.error(err);

            this.toastService.show(
              err.error ||
              'Failed to add brand'
            );
          }
        });

    } else {

      const brand: Brand = {
        brandId: this.editingBrandId,
        name: this.brandName.trim()
      };

      this.brandService
        .updateBrand(
          this.editingBrandId,
          brand
        )
        .subscribe({
          next: () => {

            this.toastService.show(
              'Brand updated successfully'
            );

            this.resetForm();

            this.loadBrands();
          },

          error: (err) => {

            console.error(err);

            this.toastService.show(
              err.error ||
              'Failed to update brand'
            );
          }
        });
    }
  }

  editBrand(brand: Brand): void {

    this.editingBrandId =
      brand.brandId;

    this.brandName =
      brand.name;
  }

  cancelEdit(): void {

    this.resetForm();
  }

  resetForm(): void {

    this.brandName = '';

    this.editingBrandId = null;
  }

  deleteBrand(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this brand?'
    );

    if (!confirmed) {
      return;
    }

    this.brandService
      .deleteBrand(id)
      .subscribe({
        next: () => {

          this.toastService.show(
            'Brand deleted successfully'
          );

          this.loadBrands();
        },

        error: (err) => {

          console.error(err);

          this.toastService.show(
            err.error ||
            'Failed to delete brand'
          );
        }
      });
  }
}