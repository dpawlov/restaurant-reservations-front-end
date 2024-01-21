import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('jwtToken');

    const requestClone = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return next.handle(requestClone).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if the error status is 403
        if (error.status === 403) {
          // Redirect to the login page
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
