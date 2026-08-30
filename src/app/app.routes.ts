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
import { ProfileComponent } from './components/profile/profile';
import { MyOrdersComponent } from './components/my-orders/my-orders';
import { RegisterComponent } from './components/register/register';
import { adminGuard } from './guards/admin-guard';

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
    canActivate: [adminGuard]
  },
  {
    path: 'admin/products/add',
    component: AddProductComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/products/edit/:id',
    component: EditProductComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/orders/:id',
    component: OrderDetailsComponent,
    canActivate: [adminGuard]
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
  component: AdminBrandsComponent,
  canActivate: [adminGuard]
  },
  {
  path: 'admin/categories',
  component: AdminCategoriesComponent,
  canActivate: [adminGuard]
  },
  {
  path: 'admin/scales',
  component: AdminScalesComponent,
  canActivate: [adminGuard]
  },
  {
  path: 'admin/series',
  component: AdminSeriesComponent,
  canActivate: [adminGuard]
  },
  {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [authGuard]
  },
  {
  path: 'my-orders',
  component: MyOrdersComponent,
  canActivate: [authGuard]
  },
  {
  path: 'login',
  component: LoginComponent
  },
  {
  path: 'register',
  component: RegisterComponent
  },
];