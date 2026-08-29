import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService,
    private router: Router
  ) { }

  statuses: string[] = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];


  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    console.log('Before API call, orders =', this.orders);

    this.orderService.getOrders()
      .subscribe({
        next: (data) => {
          console.log('API success:', data);
          this.orders = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('API failed:', err);
        }
      });
  }

  viewOrder(orderId: number): void {
    this.router.navigate(
      ['/admin/orders', orderId]
    );
  }

  updateStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status)
      .subscribe({
        next: () => {
          const order = this.orders.find(
            o => o.orderId === orderId
          );

          if (order) {
            order.status = status;
          }

          this.toastService.show('Order status updated successfully');
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  formatOrderId(orderId: number, orderDate: string): string {
    const date = new Date(orderDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const paddedId = orderId.toString().padStart(4, '0');

    return `FF${day}${month}-${paddedId}`;
  }
}