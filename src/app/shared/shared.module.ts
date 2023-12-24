import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { CreateEditReservationComponent } from '../components/create-edit-reservation/create-edit-reservation.component';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [CreateEditReservationComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    CreateEditReservationComponent,
    ConfirmationModalComponent,
  ],
})
export class SharedModule {}
