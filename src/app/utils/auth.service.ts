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
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // LOGIN USER
  login(url: string, user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, user);
  }
}
