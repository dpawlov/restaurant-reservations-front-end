import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { catchError, filter, map, Observable, throwError } from 'rxjs';

import { RestaurantService } from '../restaurant/service/restaurant.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private restaurantService: RestaurantService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.restaurantService.isLoadingSource.next(true);
    return next.handle(request).pipe(
      filter((response) => response.type !== 0),
      map((response) => {
        if (response instanceof HttpResponse) {
          this.restaurantService.isLoadingSource.next(false);
        }
        return response;
      }),
      catchError((error) => {
        this.restaurantService.isLoadingSource.next(false);
        return throwError(() => error);
      })
    );
  }
}
