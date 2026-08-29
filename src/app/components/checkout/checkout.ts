import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order';
import { ToastService } from '../../services/toast';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {

  fullName = '';
  address = '';
  phone = '';

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private toastService: ToastService,
    private router: Router
  ) { }

  placeOrder(): void {
    if (!this.fullName || !this.address || !this.phone) {
      alert('Please fill all fields');
      this.toastService.show('Please fill all fields');
      return;
    }

    const orderData = {
      customerName: this.fullName,
      address: this.address,
      phone: this.phone,
      items: this.cartService.getCart().map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.orderService.placeOrder(orderData)
      .subscribe({
        next: (response) => {
          console.log(response);

          const formattedOrderId = this.formatOrderId(
            response.orderId,
            new Date().toISOString()
          );

          this.toastService.show(
            `Order ${formattedOrderId} placed successfully`
          );

          this.cartService.clearCart();

          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to place order');
          this.toastService.show('Failed to place order');
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