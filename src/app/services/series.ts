import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../models/series';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private apiUrl = 'https://localhost:5001/api/Series';

  constructor(private http: HttpClient) { }

  getSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(this.apiUrl);
  }

  getSeriesById(id: number): Observable<Series> {
    return this.http.get<Series>(
      `${this.apiUrl}/${id}`
    );
  }

  getSeriesByBrand(brandId: number): Observable<Series[]> {
    return this.http.get<Series[]>(
      `${this.apiUrl}/brand/${brandId}`
    );
  }

  addSeries(series: Series): Observable<Series> {
    return this.http.post<Series>(
      this.apiUrl,
      series
    );
  }

  updateSeries(id: number, series: Series): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      series
    );
  }

  deleteSeries(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}