import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { catchError, throwError, Subscription } from 'rxjs';

import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { RestaurantService } from 'src/app/restaurant/service/restaurant.service';
import { Reservation } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-create-edit-reservation',
  templateUrl: './create-edit-reservation.component.html',
  styleUrls: ['./create-edit-reservation.component.css'],
})
export class CreateEditReservationComponent implements OnDestroy {
  private dialogSub!: Subscription;
  private reservationSub!: Subscription;
  private readonly selectedDate: Date = this.data.isCreate
    ? new Date(this.data.selectInfo.startStr)
    : new Date(this.data.reservationDetails.start);
  public reservationForm = this.fb.group({
    date: {
      value: this.selectedDate.toLocaleDateString(),
      disabled: true,
    },
    time: {
      value: this.selectedDate.toLocaleTimeString(),
      disabled: true,
    },
    customerName: [
      this.data.isCreate ? '' : this.data.reservationDetails.title,
      [
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-z]{1,} [A-Z]{1}[a-z]{1,}$'),
      ],
    ],
    customerPhone: [
      this.data.isCreate
        ? ''
        : this.data.reservationDetails.extendedProps.customerPhone,
      [
        Validators.required,
        Validators.pattern('^(0|\\+359|\\+[0-9]{1,3})[0-9]{9,}$'),
      ],
    ],
    persons: [
      this.data.isCreate
        ? ''
        : this.data.reservationDetails.extendedProps.persons,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(this.data.tableInfo.personCapacity),
      ],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateEditReservationComponent>,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    if (this.reservationSub) {
      this.reservationSub.unsubscribe();
    }
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }

  createReservation(): void {
    const reservationDetails: Reservation = this.composeReservationObject();
    this.reservationSub = this.restaurantService
      .createReservation(reservationDetails)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe(() => {
        this.data.calendarApi.refetchEvents();
        this.dialogRef.close();
      });
  }

  editReservation(): void {
    const reservationDetails: Reservation = this.composeReservationObject();
    this.reservationSub = this.restaurantService
      .updateReservation(reservationDetails)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe(() => {
        this.data.calendarApi.refetchEvents();
        this.dialogRef.close();
      });
  }

  cancelReservation(): void {
    const reservationId =
      this.data.reservationDetails.extendedProps.reservationId;
    const confirmationDialogRef: MatDialogRef<ConfirmationModalComponent> =
      this.dialog.open(ConfirmationModalComponent, {
        width: '25rem',
        data: {
          title: 'Cancel Reservation',
          message: 'Are you sure you want to cancel this reservation ?',
        },
      });
    this.dialogSub = confirmationDialogRef
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return;
        this.reservationSub = this.restaurantService
          .cancelReservation(reservationId)
          .pipe(
            catchError((err) => {
              return throwError(() => err);
            })
          )
          .subscribe(() => {
            this.data.calendarApi.refetchEvents();
            this.dialogRef.close();
          });
      });
  }

  private composeReservationObject(): Reservation {
    const reqDate = new Date(
      this.selectedDate.setTime(
        this.selectedDate.getTime() + 3 * 60 * 60 * 1000
      )
    );
    const reqBody: Reservation = {
      tables: [
        {
          id: this.data.tableInfo.id,
        },
      ],
      restaurantId: this.data.tableInfo.restaurantId,
      time: reqDate.toISOString(),
      customerName: this.reservationForm.get('customerName')?.value!,
      customerPhone: this.reservationForm.get('customerPhone')?.value!,
      persons: Number(this.reservationForm.get('persons')?.value),
    };
    if (!this.data.isCreate) {
      reqBody.id = this.data.reservationDetails.extendedProps.reservationId;
    }
    return reqBody;
  }
}
