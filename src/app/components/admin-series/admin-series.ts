import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SeriesService } from '../../services/series';
import { BrandService } from '../../services/brand';
import { ToastService } from '../../services/toast';

import { Series } from '../../models/series';
import { Brand } from '../../models/brand';

@Component({
  selector: 'app-admin-series',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-series.html',
  styleUrls: ['./admin-series.css']
})
export class AdminSeriesComponent
  implements OnInit {

  seriesList: Series[] = [];

  brands: Brand[] = [];

  seriesName = '';

  selectedBrandId: number | null =
    null;

  editingSeriesId: number | null =
    null;

  constructor(
    private seriesService:
      SeriesService,

    private brandService:
      BrandService,

    private toastService:
      ToastService
  ) { }

  ngOnInit(): void {

    this.loadBrands();

    this.loadSeries();
  }

  loadBrands(): void {

    this.brandService
      .getBrands()
      .subscribe({
        next: (data) => {

          this.brands = data;

        },
        error: (err) => {

          console.error(err);

          this.toastService.show(
            'Failed to load brands'
          );

        }
      });
  }

  loadSeries(): void {

    this.seriesService
      .getSeries()
      .subscribe({
        next: (data) => {

          this.seriesList = data;

        },
        error: (err) => {

          console.error(err);

          this.toastService.show(
            'Failed to load series'
          );

        }
      });
  }

  saveSeries(): void {

    if (!this.seriesName.trim()) {

      this.toastService.show(
        'Please enter a series name'
      );

      return;
    }

    if (
      this.selectedBrandId === null
    ) {

      this.toastService.show(
        'Please select a brand'
      );

      return;
    }

    const series: Series = {

      seriesId:
        this.editingSeriesId ?? 0,

      name:
        this.seriesName.trim(),

      brandId:
        this.selectedBrandId

    };

    if (
      this.editingSeriesId === null
    ) {

      this.seriesService
        .addSeries(series)
        .subscribe({
          next: () => {

            this.toastService.show(
              'Series added successfully'
            );

            this.resetForm();

            this.loadSeries();

          },

          error: (err) => {

            console.error(err);

            this.toastService.show(
              err.error ||
              'Failed to add series'
            );

          }
        });

    }
    else {

      this.seriesService
        .updateSeries(
          this.editingSeriesId,
          series
        )
        .subscribe({
          next: () => {

            this.toastService.show(
              'Series updated successfully'
            );

            this.resetForm();

            this.loadSeries();

          },

          error: (err) => {

            console.error(err);

            this.toastService.show(
              err.error ||
              'Failed to update series'
            );

          }
        });
    }
  }

  editSeries(
    series: Series
  ): void {

    this.editingSeriesId =
      series.seriesId;

    this.seriesName =
      series.name;

    this.selectedBrandId =
      series.brandId;
  }

  cancelEdit(): void {

    this.resetForm();
  }

  resetForm(): void {

    this.seriesName = '';

    this.selectedBrandId = null;

    this.editingSeriesId = null;
  }

  deleteSeries(
    id: number
  ): void {

    const confirmed = confirm(
      'Are you sure you want to delete this series?'
    );

    if (!confirmed) {
      return;
    }

    this.seriesService
      .deleteSeries(id)
      .subscribe({
        next: () => {

          this.toastService.show(
            'Series deleted successfully'
          );

          this.loadSeries();

        },

        error: (err) => {

          console.error(err);

          this.toastService.show(
            err.error ||
            'This series could not be deleted'
          );

        }
      });
  }
}