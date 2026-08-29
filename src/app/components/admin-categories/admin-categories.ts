import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/category';
import { ToastService } from '../../services/toast';
import { Category } from '../../models/category';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-categories.html',
  styleUrls: ['./admin-categories.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Category[] = [];

  categoryName = '';

  editingCategoryId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {

    this.categoryService
      .getCategories()
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error(err);
          this.toastService.show(
            'Failed to load categories'
          );
        }
      });
  }

  saveCategory(): void {

    if (!this.categoryName.trim()) {
      this.toastService.show(
        'Please enter a category name'
      );
      return;
    }

    const name = this.categoryName.trim();

    if (this.editingCategoryId === null) {

      const category: Category = {
        categoryId: 0,
        name: name
      };

      this.categoryService
        .addCategory(category)
        .subscribe({
          next: () => {
            this.toastService.show(
              'Category added successfully'
            );

            this.resetForm();
            this.loadCategories();
          },
          error: (err) => {
            console.error(err);

            this.toastService.show(
              err.error ||
              'Failed to add category'
            );
          }
        });

    } else {

      const category: Category = {
        categoryId: this.editingCategoryId,
        name: name
      };

      this.categoryService
        .updateCategory(
          this.editingCategoryId,
          category
        )
        .subscribe({
          next: () => {
            this.toastService.show(
              'Category updated successfully'
            );

            this.resetForm();
            this.loadCategories();
          },
          error: (err) => {
            console.error(err);

            this.toastService.show(
              err.error ||
              'Failed to update category'
            );
          }
        });
    }
  }

  editCategory(category: Category): void {
    this.editingCategoryId =
      category.categoryId;

    this.categoryName =
      category.name;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.categoryName = '';
    this.editingCategoryId = null;
  }

  deleteCategory(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this category?'
    );

    if (!confirmed) {
      return;
    }

    this.categoryService
      .deleteCategory(id)
      .subscribe({
        next: () => {
          this.toastService.show(
            'Category deleted successfully'
          );

          this.loadCategories();
        },
        error: (err) => {
          console.error(err);

          this.toastService.show(
            err.error ||
            'This category could not be deleted'
          );
        }
      });
  }
}