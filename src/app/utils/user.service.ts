// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  status: number;
  user?: User;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Change this to your Spring Boot backend URL
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // GET /users
  getAllUsers(url: string,): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${url}`);
  }

  // GET /user/{id}
  getUserById(url: string,id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${url}/${id}`);
  }

  // POST /user
  createUser(url: string, user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, user);
  }
  // LOGIN USER
  login(url: string,user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/${url}`, user);
  }
}
