import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

export interface PlanFeature {
  title: string;
  description: string;
  locked?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: string;
  features: PlanFeature[];
  isActive: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE';
  startDate: string;
  endDate: string | null;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserSubscriptionsService {
  constructor(private http: HttpClient) {}

  getPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<any[]>(`${API_URL}/subscription-plans`).pipe(
      map(plans => plans.map(p => ({ ...p, features: JSON.parse(p.features) })))
    );
  }

  getPlanById(id: string): Observable<SubscriptionPlan> {
    return this.http.get<any>(`${API_URL}/subscription-plans/${id}`).pipe(
      map(p => ({ ...p, features: JSON.parse(p.features) }))
    );
  }

  getSubscription(): Observable<UserSubscription> {
    return this.http.get<UserSubscription>(`${API_URL}/subscriptions`, { withCredentials: true });
  }

  createSubscription(planId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/subscriptions`, { planId }, { withCredentials: true });
  }

  updateSubscription(planId: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${API_URL}/subscriptions`, { planId }, { withCredentials: true });
  }

  cancelSubscription(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/subscriptions`, { withCredentials: true });
  }
}
