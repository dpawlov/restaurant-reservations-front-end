import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('jwtToken');

    // Clone the request to include the JWT token in the Authorization header
    const requestClone = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        // Add the Authorization header with the token if it's available
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return next.handle(requestClone);
  }
}
