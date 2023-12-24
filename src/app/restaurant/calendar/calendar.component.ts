import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import {
  defineFullCalendarElement,
  CalendarOptions,
  EventInput,
  FullCalendarElement,
} from '@fullcalendar/web-component';
defineFullCalendarElement();
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Subscription, throwError } from 'rxjs';

import { CreateEditReservationComponent } from 'src/app/components/create-edit-reservation/create-edit-reservation.component';
import { RestaurantService } from '../../restaurant/service/restaurant.service';
import { Reservation, TableInfo } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private eventSub!: Subscription;
  private tableInfo: TableInfo = this.data.tableInfo;
  private isCreate: boolean = true;
  public calendarOptions!: CalendarOptions;
  @ViewChild('calendar') calendar!: ElementRef<FullCalendarElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restaurantService: RestaurantService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5, 6],
        startTime: this.data.startTime,
        endTime: this.data.endTime,
      },
      locale: 'bg',
      timeZone: 'bg',
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
      eventOverlap: false,
      eventDurationEditable: false,
      weekends: true,
      slotDuration: '01:00:00',
      firstDay: 1,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialView: 'timeGridDay',
      validRange: {
        start: new Date(),
      },
      selectable: true,
      selectOverlap: true,
      // Create reservation
      select: (selectInfo) => {
        const calendarApi = this.calendar?.nativeElement.getApi();
        const start: number = new Date(selectInfo.startStr).getHours();
        const end: number = new Date(selectInfo.endStr).getHours();
        if (selectInfo.view.type === 'dayGridMonth') {
          return calendarApi?.changeView('timeGridDay', selectInfo.start);
        }
        if (end - 1 > start) {
          return this.snackBar.open(
            'Cannot create reservations longer than one hour',
            'close',
            {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              duration: 1500,
            }
          );
        }
        this.dialog.open(CreateEditReservationComponent, {
          width: '25rem',
          data: {
            isCreate: this.isCreate,
            tableInfo: this.tableInfo,
            selectInfo,
            calendarApi,
          },
        });
      },
      // Edit reservation
      eventClick: (eventClickInfo) => {
        const tableInfo: TableInfo = this.data.tableInfo;
        const calendarApi = this.calendar?.nativeElement.getApi();
        this.dialog.open(CreateEditReservationComponent, {
          width: '25rem',
          data: {
            isCreate: !this.isCreate,
            tableInfo,
            calendarApi,
            reservationDetails: eventClickInfo.event.toPlainObject(),
          },
        });
      },
      events: (fetchInfo, successCallback, failureCallback) => {
        this.eventSub = this.restaurantService
          .getReservations(this.data.tableInfo.id)
          .pipe(
            map((reseravtions: Reservation[]) => {
              return reseravtions.map((reservation: Reservation) => {
                const start = new Date(reservation.time);
                const end = new Date(reservation.time);
                return {
                  title: reservation.customerName,
                  start,
                  end: end.setTime(start.getTime() + 1 * 60 * 60 * 1000),
                  extendedProps: {
                    reservationId: reservation.id,
                    persons: reservation.persons,
                    customerPhone: reservation.customerPhone,
                  },
                };
              });
            }),
            catchError((error) => {
              failureCallback(error);
              return throwError(() => error);
            })
          )
          .subscribe((reservations: EventInput[]) =>
            successCallback(reservations)
          );
      },
    };
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }
}
