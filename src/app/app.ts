import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { CartService } from './services/cart';
import { ToastService } from './services/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  menuOpen = false;
  profileMenuOpen = false;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public toastService: ToastService,
    private router: Router
  ) { }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.profile-wrapper')) {
      this.profileMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/products']);
    this.profileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.profileMenuOpen = false;
    this.router.navigate(['/']);
  }
}