import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

export interface ApiKey {
  id: string;
  userId: string;
  providerType: 'GITHUB' | 'DIGITAL_OCEAN';
  keyName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApiKeyPayload {
  providerType: 'GITHUB' | 'DIGITAL_OCEAN';
  keyName: string;
  apiKey: string;
}

@Injectable({ providedIn: 'root' })
export class ApiKeysService {
  constructor(private http: HttpClient) {}

  getKeys(): Observable<ApiKey[]> {
    return this.http.get<ApiKey[]>(`${API_URL}/keys`, { withCredentials: true });
  }

  createKey(payload: CreateApiKeyPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/keys`, payload, { withCredentials: true });
  }

  renameKey(id: string, keyName: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${API_URL}/keys/${id}`, { keyName }, { withCredentials: true });
  }

  deleteKey(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/keys/${id}`, { withCredentials: true });
  }
}
