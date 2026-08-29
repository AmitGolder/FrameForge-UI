import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth Guard Triggered');
  console.log('Token:', authService.getToken());

  if (authService.isLoggedIn()) {
    console.log('Access Granted');
    return true;
  }

  console.log('Redirecting to Login');
  router.navigate(['/login']);
  return false;
};