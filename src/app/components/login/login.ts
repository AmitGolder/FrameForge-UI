import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink
} from '@angular/router';

import { ToastService } from '../../services/toast';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  login(): void {

    this.errorMessage = '';

    this.authService
      .login(this.email, this.password)
      .subscribe({

        next: (response) => {

          this.authService.saveToken(
            response.token
          );
          this.authService.saveRole(
            response.user.role
          );

          this.toastService.show(
            'Login successful'
          );

          // Normal users and admins both log in here.
          // We will redirect based on role.
          if (response.user.role === 'Admin') {

            this.router.navigate([
              '/admin/products'
            ]);

          } else {

            this.router.navigate([
              '/'
            ]);

          }

        },

        error: (err) => {

          console.error(
            'Login failed:',
            err
          );

          this.errorMessage =
            err.error?.message ||
            'Invalid email or password';

          this.toastService.show(
            this.errorMessage
          );

        }

      });
  }
}