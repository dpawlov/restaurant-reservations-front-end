import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { catchError, filter, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private snackPosition: MatSnackBarConfig = {
    verticalPosition: 'bottom',
    horizontalPosition: 'end',
    duration: 3000,
  };
  constructor(private router: Router, private snackBar: MatSnackBar) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      filter((response: HttpEvent<any>) => response.type !== 0),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400 || error.status === 500) {
            if (error.error.message) {
              this.snackBar.open(error.error.message, 'close', this.snackPosition);
            } else {
              this.snackBar.open(error.statusText, 'close', this.snackPosition);
              this.router.navigate(['']);
            }
          }
          if (error.status === 404) {
            this.router.navigate(['**']);
          }
          if (error.status === 504) {
            this.snackBar.open(
              "Couldn't load the page !",
              'close',
              this.snackPosition
            );
          }
        }
        return throwError(() => error);
      })
    );
  }
}
