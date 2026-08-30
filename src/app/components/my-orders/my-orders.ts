import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule,
  DatePipe
} from '@angular/common';

import { Router } from '@angular/router';

import { OrderService } from '../../services/order';


@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.css']
})
export class MyOrdersComponent
  implements OnInit
{
  orders: any[] = [];

  isLoading = true;

  errorMessage = '';


  constructor(
    private orderService: OrderService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.loadOrders();
  }


  loadOrders(): void {

    this.isLoading = true;

    this.errorMessage = '';


    this.orderService
      .getMyOrders()
      .subscribe({

        next: (data) => {

          this.orders = data;

          this.isLoading = false;

          this.cdr.detectChanges();

        },


        error: (err) => {

          console.error(
            'Failed to load orders:',
            err
          );

          this.errorMessage =
            'Failed to load your orders.';

          this.isLoading = false;

          this.cdr.detectChanges();

        }

      });

  }


  viewOrder(orderId: number): void {

    // We'll create a customer order-details
    // route next.

    console.log(
      'View order:',
      orderId
    );

  }


  formatOrderId(
    orderId: number,
    orderDate: string
  ): string {

    const date =
      new Date(orderDate);

    const day =
      date.getDate()
        .toString()
        .padStart(2, '0');

    const month =
      (date.getMonth() + 1)
        .toString()
        .padStart(2, '0');

    const paddedId =
      orderId
        .toString()
        .padStart(4, '0');


    return `FF${day}${month}-${paddedId}`;

  }
}