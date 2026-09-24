import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    username: string;
    password: string;
    displayName: string;
    role: string;
  };
}

export interface InfoResponse {
  course: string;
  message: string;
  version: string;
  servedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Volontairement codé en dur : fonctionne en local, posera problème au déploiement.
  private readonly apiUrl = 'http://backend:3000/api';

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      username,
      password
    });
  }

  getInfo(): Observable<InfoResponse> {
    return this.http.get<InfoResponse>(`${this.apiUrl}/info`);
  }
}
