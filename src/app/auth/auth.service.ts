// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:4200/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(loginDto: any): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`;
    return this.http.post(loginUrl, loginDto);
  }

  register(userDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userDetails);
  }

  // You may need to adjust this based on your backend response structure
  setAuthenticated(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  redirectToOverview() {
    this.router.navigate(['']);
  }
}