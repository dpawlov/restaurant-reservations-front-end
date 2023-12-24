import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let loader: HarnessLoader;

  let confirmButton: MatButtonHarness;
  let cancelButton: MatButtonHarness;

  let data: any = {
    title: 'Cancel Reservation',
    message: 'Are you sure you want to cancel this reservation ?',
  };
  let dialogRef = {
    close: (value: any) => {
      return value;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationModalComponent],
      imports: [MatDialogModule, MatButtonModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
        { provide: MatDialogRef, useValue: dialogRef },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    [confirmButton, cancelButton] = await loader.getAllHarnesses(
      MatButtonHarness
    );
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should have a heading and body messages injected with MAT_DIALOG_DATA token', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    const message = fixture.debugElement.query(By.css('.mat-dialog-content'));
    expect(heading.nativeElement.textContent).toContain(data.title);
    expect(message.nativeElement.textContent).toContain(data.message);
  });
  it('Should call confirm method when Confirm button is clicked', async () => {
    spyOn(component, 'confirm');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    await confirmButton.click();
    expect(component.confirm).toHaveBeenCalledTimes(1);
  });
  it('Should call cancel method when Cancel button is clicked', async () => {
    spyOn(component, 'cancel');
    expect(component.cancel).toHaveBeenCalledTimes(0);
    await cancelButton.click();
    expect(component.cancel).toHaveBeenCalledTimes(1);
  });
  it('Should call dialogRef.close, after pressing confirm  button', async () => {
    spyOn(fixture.componentInstance.dialogRef, 'close').withArgs(true);
    await confirmButton.click();
    expect(fixture.componentInstance.dialogRef.close).toHaveBeenCalled();
  });
  it('Should call dialogRef.close, after pressing cancel  button', async () => {
    spyOn(fixture.componentInstance.dialogRef, 'close').withArgs(false);
    await cancelButton.click();
    expect(fixture.componentInstance.dialogRef.close).toHaveBeenCalled();
  });
});
