import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScaleService } from '../../services/scale';
import { ToastService } from '../../services/toast';
import { Scale } from '../../models/scale';

@Component({
  selector: 'app-admin-scales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-scales.html',
  styleUrls: ['./admin-scales.css']
})
export class AdminScalesComponent implements OnInit {

  scales: Scale[] = [];

  scaleName = '';

  editingScaleId: number | null = null;

  constructor(
    private scaleService: ScaleService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadScales();
  }

  loadScales(): void {
    this.scaleService.getScales().subscribe({
      next: (data) => {
        this.scales = data;
      },
      error: (err) => {
        console.error(err);
        this.toastService.show(
          'Failed to load scales'
        );
      }
    });
  }

  saveScale(): void {

    if (!this.scaleName.trim()) {
      this.toastService.show(
        'Please enter a scale'
      );
      return;
    }

    const scale: Scale = {
      scaleId:
        this.editingScaleId ?? 0,
      name:
        this.scaleName.trim()
    };

    if (this.editingScaleId === null) {

      this.scaleService
        .addScale(scale)
        .subscribe({
          next: () => {
            this.toastService.show(
              'Scale added successfully'
            );

            this.resetForm();
            this.loadScales();
          },
          error: (err) => {
            console.error(err);

            this.toastService.show(
              err.error ||
              'Failed to add scale'
            );
          }
        });

    } else {

      this.scaleService
        .updateScale(
          this.editingScaleId,
          scale
        )
        .subscribe({
          next: () => {
            this.toastService.show(
              'Scale updated successfully'
            );

            this.resetForm();
            this.loadScales();
          },
          error: (err) => {
            console.error(err);

            this.toastService.show(
              err.error ||
              'Failed to update scale'
            );
          }
        });
    }
  }

  editScale(scale: Scale): void {
    this.editingScaleId =
      scale.scaleId;

    this.scaleName =
      scale.name;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.scaleName = '';
    this.editingScaleId = null;
  }

  deleteScale(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this scale?'
    );

    if (!confirmed) {
      return;
    }

    this.scaleService
      .deleteScale(id)
      .subscribe({
        next: () => {
          this.toastService.show(
            'Scale deleted successfully'
          );

          this.loadScales();
        },
        error: (err) => {
          console.error(err);

          this.toastService.show(
            err.error ||
            'This scale could not be deleted'
          );
        }
      });
  }
}