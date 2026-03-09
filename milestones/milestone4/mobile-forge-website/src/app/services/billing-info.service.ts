import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

export interface BillingInfo {
  id: string;
  userId: string;
  cardLastFour: string;
  cardType: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER';
  createdAt: string;
  updatedAt: string;
}

export interface BillingFormPayload {
  nameOnCard: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  address: string;
  state: string;
  zip: string;
  cardType: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER';
}

@Injectable({ providedIn: 'root' })
export class BillingInfoService {
  constructor(private http: HttpClient) {}

  getBillingInfo(): Observable<BillingInfo> {
    return this.http.get<BillingInfo>(`${API_URL}/billing`, { withCredentials: true });
  }

  createBillingInfo(payload: BillingFormPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/billing`, payload, { withCredentials: true });
  }

  updateBillingInfo(payload: BillingFormPayload): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${API_URL}/billing`, payload, { withCredentials: true });
  }

  deleteBillingInfo(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/billing`, { withCredentials: true });
  }
}
