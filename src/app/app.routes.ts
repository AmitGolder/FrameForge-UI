import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { AdminProductsComponent } from './components/admin-products/admin-products';
import { AddProductComponent } from './components/add-product/add-product';
import { EditProductComponent } from './components/edit-product/edit-product';
import { LoginComponent } from './components/login/login';
import { CartComponent } from './components/cart/cart';
import { CheckoutComponent } from './components/checkout/checkout';
import { OrdersComponent } from './components/orders/orders';
import { OrderDetailsComponent } from './components/order-details/order-details';
import { TrackOrderComponent } from './components/track-order/track-order';
import { AdminBrandsComponent } from './components/admin-brands/admin-brands';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories';
import { AdminScalesComponent } from './components/admin-scales/admin-scales';
import { AdminSeriesComponent } from './components/admin-series/admin-series';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/products/add',
    component: AddProductComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/products/edit/:id',
    component: EditProductComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/orders/:id',
    component: OrderDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'track-order',
    component: TrackOrderComponent
  },
  {
  path: 'admin/brands',
  component: AdminBrandsComponent
  },
  {
  path: 'admin/categories',
  component: AdminCategoriesComponent
  },
  {
  path: 'admin/scales',
  component: AdminScalesComponent
  },
  {
  path: 'admin/series',
  component: AdminSeriesComponent
  }
];