import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'frameforge_cart';

  constructor() { }

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(item: CartItem): void {
    const cart = this.getCart();

    const existingItem = cart.find(
      x => x.productId === item.productId
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart()
      .filter(item => item.productId !== productId);

    this.saveCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  getTotal(): number {
    return this.getCart()
      .reduce((total, item) =>
        total + (item.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.getCart()
      .reduce((count, item) =>
        count + item.quantity, 0);
  }

  increaseQuantity(productId: number): void {
    const cart = this.getCart();

    const item = cart.find(x => x.productId === productId);

    if (item) {
      item.quantity++;
    }

    this.saveCart(cart);
  }

  decreaseQuantity(productId: number): void {
    let cart = this.getCart();

    const item = cart.find(x => x.productId === productId);

    if (item) {
      item.quantity--;

      if (item.quantity <= 0) {
        cart = cart.filter(x => x.productId !== productId);
      }
    }

    this.saveCart(cart);
  }
}