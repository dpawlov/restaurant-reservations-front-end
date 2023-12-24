import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Observable, switchMap } from 'rxjs';

import { RestaurantDetails, TableInfo } from 'src/app/models/restaurant.model';
import { RestaurantService } from '../service/restaurant.service';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public restaurantDetails$!: Observable<RestaurantDetails>;
  public isLoading$: Observable<boolean> =
    this.restaurantService.isLoadingSource.asObservable();
  public displayedColumns: string[] = [
    'tableNumber',
    'personCapacity',
    'description',
    'actions',
  ];

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.restaurantService.isLoadingSource.next(true);
  }

  openReservationDialog(
    tableInfo: TableInfo,
    startTime: string,
    endTime: string
  ) {
    this.restaurantService.isLoadingSource.next(true);
    this.dialog.open(CalendarComponent, {
      height: 'auto',
      width: '50rem',
      data: {
        tableInfo,
        startTime,
        endTime,
      },
    });
  }

  ngOnInit(): void {
    this.restaurantDetails$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.restaurantService.getById(params.get('id')!)
      )
    );
  }
}
