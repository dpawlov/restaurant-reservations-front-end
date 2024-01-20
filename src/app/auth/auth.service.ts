// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:4200/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  getUserId(): number | undefined {
    const token = this.getJwtToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.userId as number;
    }
    return undefined;
  }

  login(loginDto: any): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`;
    return this.http.post<any>(loginUrl, loginDto).pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.jwtToken);
        this.setAuthenticated(true);
      })
    );
  }

  register(userDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userDetails);
  }

  setAuthenticated(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getJwtToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.setAuthenticated(false);
    this.router.navigate(['/login']);
  }

  redirectToOverview() {
    this.router.navigate(['']);
  }
}
