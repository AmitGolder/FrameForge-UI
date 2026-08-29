import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {

  constructor(public cartService: CartService) { }

  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  increase(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }
}