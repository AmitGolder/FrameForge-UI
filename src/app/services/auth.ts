import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:5001/api/Auth';

  constructor(private http: HttpClient) { }


  register(
    name: string,
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      {
        name,
        email,
        password
      }
    );
  }


  login(
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    );
  }


  saveToken(token: string): void {

    localStorage.setItem(
      'token',
      token
    );
  }


  saveRole(role: string): void {

    localStorage.setItem(
      'role',
      role
    );
  }


  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );
  }


  getRole(): string | null {

    return localStorage.getItem(
      'role'
    );
  }


  isLoggedIn(): boolean {

    return !!this.getToken();
  }


  isAdmin(): boolean {

    return this.getRole() === 'Admin';
  }


  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'role'
    );
  }
}