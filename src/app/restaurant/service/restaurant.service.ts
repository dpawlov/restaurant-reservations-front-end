import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  Observable,
  of,
} from 'rxjs';

import {
  Reservation,
  RestaurantDetails,
  RestaurantOverview,
  TableInfo,
} from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl: string = 'http://localhost:4200/api';
  public isLoadingSource: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(private http: HttpClient) {}

  getAllRestaurants(query?: string): Observable<RestaurantOverview[]> {
    if (query && query !== '') {
      return this.http
        .get<RestaurantOverview[]>(`${this.baseUrl}/restaurant?name=${query}`)
        .pipe(
          catchError(() => {
            return of([]);
          })
        );
    }
    return this.http
      .get<RestaurantOverview[]>(`${this.baseUrl}/restaurant`)
      .pipe(
        catchError(() => {
          return of([]);
        })
      );
  }

  getById(id: string): Observable<RestaurantDetails> {
    return forkJoin([
      this.http.get<RestaurantDetails>(`${this.baseUrl}/restaurant/${id}`),
      this.http.get<TableInfo[]>(`${this.baseUrl}/table`),
    ]).pipe(
      map(
        ([restaurantDetails, allTables]: [RestaurantDetails, TableInfo[]]) => {
          const restaurantTables = allTables.filter(
            (table: TableInfo) => table.restaurantId === restaurantDetails.id
          );
          return { ...restaurantDetails, tableInfo: restaurantTables };
        }
      ),
      catchError(() => {
        return of();
      })
    );
  }

  getReservations(tableId?: number): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(`${this.baseUrl}/reservation?tableInfoId=${tableId}`)
      .pipe(
        catchError(() => {
          return of([]);
        })
      );
  }

  createReservation(reservationDetails: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.baseUrl}/reservation`,
      reservationDetails
    );
  }
  updateReservation(reservationDetails: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(
      `${this.baseUrl}/reservation`,
      reservationDetails
    );
  }

  cancelReservation(reservationId: number): Observable<Reservation> {
    return this.http.delete<Reservation>(
      `${this.baseUrl}/reservation/${reservationId}`
    );
  }
}
