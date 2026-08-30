import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  register(): void {

    this.errorMessage = '';

    if (!this.name.trim()) {
      this.errorMessage = 'Name is required.';
      return;
    }

    if (!this.email.trim()) {
      this.errorMessage = 'Email is required.';
      return;
    }

    if (!this.password) {
      this.errorMessage = 'Password is required.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.authService
      .register(
        this.name,
        this.email,
        this.password
      )
      .subscribe({

        next: () => {

          this.isLoading = false;

          this.toastService.show(
            'Registration successful. Please log in.'
          );

          this.router.navigate([
            '/login'
          ]);

        },

        error: (err) => {

          this.isLoading = false;

          console.error(
            'Registration failed:',
            err
          );

          this.errorMessage =
            err.error?.message ||
            'Registration failed. Please try again.';

        }

      });
  }
}