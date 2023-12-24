import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';

import {
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { of } from 'rxjs';

import { CreateEditReservationComponent } from './create-edit-reservation.component';
import { RestaurantService } from 'src/app/restaurant/service/restaurant.service';
import { Reservation } from 'src/app/models/restaurant.model';

describe('CreateEditReservationComponent tests', () => {
  let component: CreateEditReservationComponent;
  let fixture: ComponentFixture<CreateEditReservationComponent>;
  let loader: HarnessLoader;

  let restaurantServiceSpy: jasmine.SpyObj<RestaurantService> =
    jasmine.createSpyObj('RestaurantService', [
      'createReservation',
      'updateReservation',
      'cancelReservation',
    ]);

  let fields: MatInputHarness[];
  let dateField: MatInputHarness;
  let timeField: MatInputHarness;
  let nameField: MatInputHarness;
  let phoneField: MatInputHarness;
  let personsField: MatInputHarness;
  let createReservationButton: MatButtonHarness;
  let editReservationButton: MatButtonHarness;
  let cancelReservationButton: MatButtonHarness;
  let confirmButton: MatButtonHarness;
  let cancelButton: MatButtonHarness;
  let reservationForm: FormGroup;
  let confirmationDialog: MatDialogHarness;

  let validTestName: string = 'Daniel Naydenov';
  let invalidTestName: string = 'daniel naydenov';
  let validTestPhone: string = '0888888888';
  let validTestPersons: string = '4';

  let dialogRef = {
    close: (value: any) => {
      return value;
    },
  };

  let stubReservation: Reservation = {
    customerName: validTestName,
    customerPhone: validTestPhone,
    id: 52,
    persons: 4,
    restaurantId: 1,
    tables: [{ id: 1 }],
    time: '2022-09-21T11:00:00+03:00',
  };

  describe('Make reservation', () => {
    const data: any = {
      isCreate: true,
      tableInfo: { id: 1, personCapacity: 4 },
      selectInfo: { startStr: '2022-09-21T11:00:00+03:00' },
      calendarApi: {
        refetchEvents: () => {
          return;
        },
      },
    };
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [CreateEditReservationComponent],
        imports: [
          OverlayModule,
          BrowserAnimationsModule,
          MatDialogModule,
          ReactiveFormsModule,
          MatInputModule,
          MatButtonModule,
        ],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: data },
          {
            provide: RestaurantService,
            useValue: restaurantServiceSpy,
          },
          { provide: OverlayRef, useValue: {} },
          {
            provide: MatDialogRef,
            useValue: dialogRef,
          },
          {
            provide: MatDialogConfig,
            useValue: {},
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(CreateEditReservationComponent);
      component = fixture.componentInstance;
      loader = TestbedHarnessEnvironment.loader(fixture);

      fields = await loader.getAllHarnesses(MatInputHarness);
      [dateField, timeField, nameField, phoneField, personsField] = fields;
      [createReservationButton] = await loader.getAllHarnesses(
        MatButtonHarness
      );
      reservationForm = component.reservationForm;

      fixture.detectChanges();
    });

    describe('Date field', () => {
      it('Should be disabled', async () => {
        const isDateFieldDisabled = await dateField.isDisabled();
        expect(isDateFieldDisabled).toBe(true);
      });
      it('Should contain input data extracted from injected MAT_DIALOG_DATA token', async () => {
        const fieldDate = await dateField.getValue();
        const injectedDate = new Date(component.data.selectInfo.startStr);
        expect(fieldDate).toEqual(injectedDate.toLocaleDateString());
      });
    });

    describe('Time field', () => {
      it('Should be disabled', async () => {
        const isTimeFieldDisabled = await timeField.isDisabled();
        expect(isTimeFieldDisabled).toBe(true);
      });
      it('Should contain input data extracted from injected MAT_DIALOG_DATA token', async () => {
        const fieldTime = await timeField.getValue();
        const injectedTime = new Date(component.data.selectInfo.startStr);
        expect(fieldTime).toEqual(injectedTime.toLocaleTimeString());
      });
    });

    describe('Customer Name field', () => {
      it('Should display PATTERN error with invalid name format', async () => {
        await nameField.focus();
        await nameField.setValue(invalidTestName);
        await nameField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('pattern', 'customerName')).toBe(true);
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.textContent).toContain(
          'Both names must start with a capital letter!'
        );
      });
      it('Should display REQUIRED error with empty input', async () => {
        await nameField.focus();
        await nameField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('required', 'customerName')).toBe(true);
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.textContent).toContain(
          'Name is required'
        );
      });
      it('Should display NO ERRORS with valid input', async () => {
        await nameField.focus();
        await nameField.setValue(validTestName);
        await nameField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('required', 'customerName')).toBe(
          false
        );
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement).toBeNull();
      });
    });
    describe('Customer Phone field', () => {
      it('Should display REQUIRED error with empty input', async () => {
        await phoneField.focus();
        await phoneField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('required', 'customerPhone')).toBe(
          true
        );
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.textContent).toContain(
          ' Phone number is required !'
        );
      });
      it('Should display NO ERRORS with valid input', async () => {
        await phoneField.focus();
        await phoneField.setValue(validTestPhone);
        await phoneField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('required', 'customerPhone')).toBe(
          false
        );
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement).toBeNull();
      });
    });
    describe('Persons field', () => {
      it('Should display MIN error with guest number lower than 1', async () => {
        await personsField.focus();
        await personsField.setValue('0');
        await personsField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('min', 'persons')).toBe(true);
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.textContent).toContain(
          'Cannot reserve table for less than 1 guest!'
        );
      });
      it('Should display MAX error with guest number higher than table capacity', async () => {
        await personsField.focus();
        await personsField.setValue('5');
        await personsField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('max', 'persons')).toBe(true);
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.textContent).toContain(
          'Guests number higher than table capacity !'
        );
      });
      it('Should display REQUIRED error with an empty input for guest number', async () => {
        await personsField.focus();
        await personsField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('required', 'persons')).toBe(true);
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.textContent).toContain(
          'Guest number is required !'
        );
      });
      it('Should display NO ERRORS with valid input', async () => {
        await personsField.focus();
        await personsField.setValue(validTestPersons);
        await personsField.blur();
        expect(reservationForm.touched).toBe(true);
        expect(reservationForm.hasError('required', 'persons')).toBe(false);
        const errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement).toBeNull();
      });
    });

    describe('Create reservation button', () => {
      it('Should be disabled when "ReservationForm" state is "invalid"', async () => {
        const isButtonDisabled = await createReservationButton.isDisabled();
        expect(isButtonDisabled).toBe(true);
      });
      it('Should not be disabled when "ReservationForm" state is "valid"', async () => {
        await nameField.setValue(validTestName);
        await phoneField.setValue(validTestPhone);
        await personsField.setValue(validTestPersons);
        const isButtonDisabled = await createReservationButton.isDisabled();
        expect(isButtonDisabled).toBe(false);
      });
    });

    describe('Ceate reservation method', () => {
      it('Should call "RestaurantService.createReservation" method once', async () => {
        restaurantServiceSpy.createReservation.and.returnValue(
          of(stubReservation)
        );
        await nameField.setValue(validTestName);
        await phoneField.setValue(validTestPhone);
        await personsField.setValue(validTestPersons);
        const isButtonDisabled = await createReservationButton.isDisabled();
        expect(isButtonDisabled).toBe(false);
        await createReservationButton.click();
        expect(restaurantServiceSpy.createReservation).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Update/Cancel Reservation', () => {
    const data: any = {
      isCreate: false,
      tableInfo: { id: 1, personCapacity: 4 },
      reservationDetails: {
        title: validTestName,
        start: '2022-09-21T11:00:00+03:00',
        end: '2022-09-21T12:00:00+03:00',
        extendedProps: {
          reservationId: 52,
          persons: 4,
          customerPhone: validTestPhone,
        },
      },
      calendarApi: {
        refetchEvents: () => {
          return;
        },
      },
    };

    const stubReservation: Reservation = {
      id: 52,
      time: '2022-09-21T11:00:00+03:00',
      customerName: validTestName,
      customerPhone: validTestPhone,
      persons: Number(validTestPersons),
      tables: [
        {
          id: 1,
          personCapacity: 4,
          tableNumber: 1,
          description: 'Standart table with built in wall tap for beer !',
          restaurantId: 1,
        },
      ],
      restaurantId: 1,
    };
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [CreateEditReservationComponent],
        imports: [
          OverlayModule,
          BrowserAnimationsModule,
          MatDialogModule,
          ReactiveFormsModule,
          MatInputModule,
          MatButtonModule,
        ],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: data },
          {
            provide: RestaurantService,
            useValue: restaurantServiceSpy,
          },
          { provide: OverlayRef, useValue: {} },
          {
            provide: MatDialogRef,
            useValue: dialogRef,
          },
          {
            provide: MatDialogConfig,
            useValue: {},
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(CreateEditReservationComponent);
      component = fixture.componentInstance;
      loader = TestbedHarnessEnvironment.documentRootLoader(fixture);

      fields = await loader.getAllHarnesses(MatInputHarness);
      [dateField, timeField, nameField, phoneField, personsField] = fields;
      [editReservationButton, cancelReservationButton] =
        await loader.getAllHarnesses(MatButtonHarness);
      reservationForm = component.reservationForm;

      fixture.detectChanges();
    });
    describe('Edit reservation', () => {
      it('Should display "Edit reservation" title upon creation', () => {
        const title = fixture.debugElement.query(By.css('h1'));
        expect(title.nativeElement.textContent).toContain('Edit Reservation');
      });
      it('Should populate fields with data from the injected MAT_DIALOG_DATA token', async () => {
        const dateFieldValue = await dateField.getValue();
        const timeFieldValue = await timeField.getValue();
        const nameFieldValue = await nameField.getValue();
        const phoneFieldValue = await phoneField.getValue();
        const personsFieldValue = await personsField.getValue();
        expect(dateFieldValue).toEqual(
          new Date(data.reservationDetails.start).toLocaleDateString()
        );
        expect(timeFieldValue).toEqual(
          new Date(data.reservationDetails.start).toLocaleTimeString()
        );
        expect(nameFieldValue).toEqual(data.reservationDetails.title);
        expect(phoneFieldValue).toEqual(
          data.reservationDetails.extendedProps.customerPhone
        );
        expect(Number(personsFieldValue)).toEqual(
          data.reservationDetails.extendedProps.persons
        );
      });
      it('Should call updateReservation method only once', async () => {
        restaurantServiceSpy.updateReservation.and.returnValue(
          of(stubReservation)
        );
        await nameField.setValue(validTestName);
        await phoneField.setValue(validTestPhone);
        await personsField.setValue(validTestPersons);
        await editReservationButton.click();
        expect(restaurantServiceSpy.updateReservation).toHaveBeenCalledTimes(1);
      });
    });
    describe('Cancel reservation', () => {
      beforeEach(async () => {
        await cancelReservationButton.click();
        confirmationDialog = await loader.getHarness(MatDialogHarness);
        [confirmButton, cancelButton] =
          await confirmationDialog.getAllHarnesses(MatButtonHarness);
        restaurantServiceSpy.cancelReservation.calls.reset();
        restaurantServiceSpy.cancelReservation
          .withArgs(stubReservation.id!)
          .and.returnValue(of(stubReservation));
      });
      it('Should open a confirmation dialog', async () => {
        expect(confirmationDialog).toBeTruthy();
      });
      it('Should not call restaurantService.cancelReservation if canceled', async () => {
        await cancelButton.click();
        expect(restaurantServiceSpy.cancelReservation).not.toHaveBeenCalled();
      });
      it('Should call restaurantService.cancelReservation if confirmed', async () => {
        await confirmButton.click();
        expect(restaurantServiceSpy.cancelReservation).toHaveBeenCalledTimes(1);
      });
    });
  });
});
