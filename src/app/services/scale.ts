import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scale } from '../models/scale';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  private apiUrl =
    'https://localhost:5001/api/Scales';

  constructor(private http: HttpClient) {}

  getScales(): Observable<Scale[]> {
    return this.http.get<Scale[]>(
      this.apiUrl
    );
  }

  getScale(id: number): Observable<Scale> {
    return this.http.get<Scale>(
      `${this.apiUrl}/${id}`
    );
  }

  addScale(scale: Scale): Observable<Scale> {
    return this.http.post<Scale>(
      this.apiUrl,
      scale
    );
  }

  updateScale(
    id: number,
    scale: Scale
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      scale
    );
  }

  deleteScale(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}