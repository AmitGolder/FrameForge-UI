import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:5001/api/Orders';

  constructor(private http: HttpClient) { }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      orderData
    );
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl
    );
  }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/my-orders`
    );
  }

  getOrder(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );
  }

  updateOrderStatus(
    id: number,
    status: string
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  }

  trackOrder(
    orderId: number,
    phone: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/track`,
      { orderId, phone }
    );
  }
}