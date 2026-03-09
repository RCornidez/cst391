import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
  }

  register(email: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/auth/register`, { email, password });
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  }
}
