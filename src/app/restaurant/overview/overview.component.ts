import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
} from 'rxjs';

import { RestaurantOverview } from 'src/app/models/restaurant.model';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  public searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
  public allRestaurants$!: Observable<RestaurantOverview[]>;
  public isLoading$: Observable<boolean> =
    this.restaurantService.isLoadingSource.asObservable();

  constructor(private restaurantService: RestaurantService) {
    this.restaurantService.isLoadingSource.next(true);
  }

  ngOnInit(): void {
    this.allRestaurants$ = this.restaurantService.getAllRestaurants();
  }

  getSearchResults(event: Event): void {
    this.searchTerm$.next((event.target as HTMLInputElement).value);
    this.allRestaurants$ = this.searchTerm$.pipe(
      map((query: string) => query.trim()),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((query: string) => {
        return this.restaurantService.getAllRestaurants(query);
      })
    );
  }

  sortByRating(event: MatSelectChange): void {
    this.restaurantService.isLoadingSource.next(true);
    this.allRestaurants$ = this.allRestaurants$.pipe(
      map((restaurants: RestaurantOverview[]) => {
        return restaurants.sort((a, b) => {
          return event.value === 'lowest'
            ? a.rating - b.rating
            : b.rating - a.rating;
        });
      })
    );
  }
}
