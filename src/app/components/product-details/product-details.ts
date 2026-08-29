import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { ProductDetail } from '../../models/product-detail';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {

  product?: ProductDetail;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.productService.getProduct(id)
      .subscribe(data => {

        console.log(data);

        this.product = data;

        this.cdr.detectChanges();

        console.log('After assign:', this.product);
      });
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.cartService.addToCart({
      productId: this.product.productId,
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
      image: this.product.images?.[0] || ''
    });

    //alert('Added to cart');
    this.toastService.show('Added to cart');
  }

  getImageUrl(imageName: string): string {
    return `https://localhost:5001/images/products/${imageName}`;
  }
}