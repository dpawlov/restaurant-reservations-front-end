import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

@NgModule({
  declarations: [
    OverviewComponent,
    DetailsComponent,
    CalendarComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RestaurantModule {}
