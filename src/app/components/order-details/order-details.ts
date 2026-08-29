import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { OrderService } from '../../services/order';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './order-details.html',
  styleUrls: ['./order-details.css']
})
export class OrderDetailsComponent implements OnInit {

  order: any = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.loadOrder(id);
    }
  }

  loadOrder(id: number): void {
    this.orderService.getOrder(id)
      .subscribe({
        next: (data) => {
          this.order = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
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