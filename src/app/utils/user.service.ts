// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  age: number;
  profession: string;
  role: string;
}
// export interface LoginResponse {
//   success: boolean;
//   message: string;
//   status: number;
//   user?: User;
// }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Change this to your Spring Boot backend URL
  private baseUrl = environment.apiUrl; // ✅ HERE

  constructor(private http: HttpClient) {}

  // GET /users
  getAllUsers(url: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${url}`);
  }

  // GET /user/{id}
  getUserById(url: string, id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${url}/${id}`);
  }

  // POST /user
  createUser(url: string, user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, user);
  }
  
  updateUser(url: string, id: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${url}/${id}`, user);
  }

  deleteUser(url: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${url}/${id}`);
  }
}
