import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl =
    'https://localhost:5001/api/Profile';

  constructor(
    private http: HttpClient
  ) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(
      this.apiUrl
    );
  }

  updateProfile(
    name: string,
    email: string
  ): Observable<User> {

    return this.http.put<User>(
      this.apiUrl,
      {
        name,
        email
      }
    );
  }
}