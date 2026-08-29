import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { OrderService } from '../../services/order';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.css']
})
export class AdminProductsComponent implements OnInit {

  products: Product[] = [];
  orders: any[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log(data);
        this.orders = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteProduct(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) {
      return;
    }

    this.productService
      .deleteProduct(id)
      .subscribe({
        next: () => {
          this.toastService.show('Product Deleted Successfully');
          this.loadProducts();
        },
        error: (err) => {
          console.error(err);
          this.toastService.show('Failed to delete product');
        }
      });
  }

  getImageUrl(imageName: string): string {
    return `https://localhost:5001/images/products/${imageName}`;
  }

  get inStockCount(): number {
    return this.products.filter(p => p.isAvailable).length;
  }

  get outOfStockCount(): number {
    return this.products.filter(p => !p.isAvailable).length;
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get pendingOrders(): number {
    return this.orders.filter(o => o.status === 'Pending').length;
  }

  get totalRevenue(): number {
    return this.orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
  }
}