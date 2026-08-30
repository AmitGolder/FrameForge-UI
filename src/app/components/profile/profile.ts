import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileService } from '../../services/profile';
import { User } from '../../models/user';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  isLoading = true;
  isEditing = false;

  errorMessage = '';
  successMessage = '';

  name = '';
  email = '';


  constructor(
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.loadProfile();
  }


  loadProfile(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.profileService
      .getProfile()
      .subscribe({

        next: (data: User) => {

          this.user = data;

          this.name = data.name;
          this.email = data.email;

          this.isLoading = false;

          // Force Angular to update the UI
          this.cdr.detectChanges();
        },


        error: (err) => {

          console.error(
            'Failed to load profile:',
            err
          );

          this.errorMessage =
            'Failed to load profile.';

          this.isLoading = false;

          // Force Angular to update the UI
          this.cdr.detectChanges();
        }

      });
  }


  startEditing(): void {

    if (!this.user) {
      return;
    }

    this.name = this.user.name;
    this.email = this.user.email;

    this.errorMessage = '';
    this.successMessage = '';

    this.isEditing = true;

    this.cdr.detectChanges();
  }


  cancelEditing(): void {

    if (this.user) {

      this.name = this.user.name;
      this.email = this.user.email;

    }

    this.isEditing = false;

    this.errorMessage = '';
    this.successMessage = '';

    this.cdr.detectChanges();
  }


  updateProfile(): void {

    this.errorMessage = '';
    this.successMessage = '';


    if (!this.name.trim()) {

      this.errorMessage =
        'Name is required.';

      this.cdr.detectChanges();

      return;
    }


    if (!this.email.trim()) {

      this.errorMessage =
        'Email is required.';

      this.cdr.detectChanges();

      return;
    }


    this.profileService
      .updateProfile(
        this.name,
        this.email
      )
      .subscribe({

        next: (updatedUser: User) => {

          this.user = updatedUser;

          this.name = updatedUser.name;
          this.email = updatedUser.email;

          this.successMessage =
            'Profile updated successfully.';

          this.isEditing = false;

          this.cdr.detectChanges();
        },


        error: (err) => {

          console.error(
            'Failed to update profile:',
            err
          );

          this.errorMessage =
            err.error?.message ||
            'Failed to update profile.';

          this.cdr.detectChanges();
        }

      });
  }
}