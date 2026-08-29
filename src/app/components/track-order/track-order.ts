import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';
import { ToastService } from '../../services/toast';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-order.html',
  styleUrls: ['./track-order.css']
})
export class TrackOrderComponent {

  orderId = '';
  phone = '';
  order: any = null;

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  trackOrder(): void {
    const numericOrderId = Number(
      this.orderId.split('-').pop()
    );

    this.orderService
      .trackOrder(numericOrderId, this.phone)
      .subscribe({
        next: (data) => {
          this.order = data;
          this.cdr.detectChanges();
        },
        error: () => {
          this.toastService.show('Order not found');
        }
      });
  }

  getImageUrl(imageName: string): string {
    return `https://localhost:5001/images/products/${imageName}`;
  }

  formatOrderId(orderId: number, orderDate: string): string {
    const date = new Date(orderDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const paddedId = orderId.toString().padStart(4, '0');

    return `FF${day}${month}-${paddedId}`;
  }
}