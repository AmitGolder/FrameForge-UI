import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  login(): void {
    console.log('Login button clicked');
    this.errorMessage = '';

    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);

          alert('Login successful');
          this.toastService.show('Login successful');

          this.router.navigate(['/admin/products']);
        },
        error: () => {
          this.errorMessage = 'Invalid username or password';
          this.toastService.show('Invalid username or password');
        }
      });
  }
}