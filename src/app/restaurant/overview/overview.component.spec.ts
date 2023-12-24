// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { By } from '@angular/platform-browser';
// import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
// import { HarnessLoader } from '@angular/cdk/testing';

// import { MatCardHarness } from '@angular/material/card/testing';
// import { MatButtonHarness } from '@angular/material/button/testing';
// import { of } from 'rxjs';

// import { AppRoutingModule } from 'src/app/app-routing.module';
// import { MatInputModule } from '@angular/material/input';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';

// import { RestaurantOverview } from 'src/app/models/restaurant.model';
// import { OverviewComponent } from './overview.component';
// import { RestaurantService } from '../service/restaurant.service';
// import MockData from 'src/app/MockData';

// describe('OverviewComponent', () => {
//   let component: OverviewComponent;
//   let loader: HarnessLoader;
//   let fixture: ComponentFixture<OverviewComponent>;
//   let restaurantServiceSpy: jasmine.SpyObj<RestaurantService>;
//   let stubRestaurants: RestaurantOverview[] = MockData.allHomeViewRestaurants;
//   let inputEl: DebugElement;

//   beforeEach(async () => {
//     restaurantServiceSpy = jasmine.createSpyObj('RestaurantService', [
//       'getAllRestaurants',
//     ]);
//     restaurantServiceSpy.getAllRestaurants.and.returnValue(of(stubRestaurants));

//     await TestBed.configureTestingModule({
//       declarations: [OverviewComponent],
//       imports: [
//         BrowserAnimationsModule,
//         AppRoutingModule,
//         MatInputModule,
//         MatCardModule,
//         MatButtonModule,
//         MatFormFieldModule,
//       ],
//       providers: [
//         { provide: RestaurantService, useValue: restaurantServiceSpy },
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();

//     fixture = TestBed.createComponent(OverviewComponent);
//     loader = TestbedHarnessEnvironment.loader(fixture);
//     component = fixture.componentInstance;
//   });

//   describe('Integration tests with valid data', () => {
//     it('Should render a card for each restaurant', async () => {
//       const cards = await loader.getAllHarnesses(MatCardHarness);
//       expect(cards.length).toBe(stubRestaurants.length);
//     });
//     it('Should render a card with header and title inside it', async () => {
//       const header = await loader.getChildLoader('.mat-card-header');
//       const title = await header.getChildLoader('.mat-card-title');
//       expect(header).toBeTruthy();
//       expect(title).toBeTruthy();
//     });
//     it('Should have a "DETAILS" button', async () => {
//       const button = await loader.getHarness(MatButtonHarness);
//       const buttonText = await button.getText();
//       expect(buttonText).toEqual('DETAILS');
//     });
//     it('Should have first restaurant title equal to "Gosho Foods"', async () => {
//       const cards = await loader.getAllHarnesses(MatCardHarness);
//       const title = await cards[0].getTitleText();
//       expect(title).toBe('Gosho Foods');
//     });
//   });

//   describe('Integration tests with invalid data', () => {
//     beforeEach(() => {
//       restaurantServiceSpy.getAllRestaurants.and.returnValue(of());
//       fixture.detectChanges();
//     });
//     it('Should render "no restaurants" template when service returns no restaurants', () => {
//       const el = fixture.debugElement.query(By.css('.no-restaurants'));
//       expect(el).toBeTruthy();
//     });
//     it('Should render "No Restaurants found!" message.', () => {
//       const el = fixture.debugElement.query(By.css('h1'));
//       expect(el.nativeElement.textContent).toContain('No restaurants found !');
//     });
//     it('Should render an image', () => {
//       const el = fixture.debugElement.query(By.css('img'));
//       expect(el).toBeTruthy();
//     });
//     it('Should render "Try again" button', async () => {
//       const button = await loader.getHarness(MatButtonHarness);
//       const buttonText = await button.getText();
//       expect(buttonText).toContain('Try again');
//     });
//     it('Should render 5 cards after click on "Try again" button', async () => {
//       restaurantServiceSpy.getAllRestaurants.and.returnValue(
//         of(stubRestaurants)
//       );
//       const button = await loader.getHarness(MatButtonHarness);
//       const buttonText = await button.getText();
//       expect(buttonText).toContain('Try again');
//       button.click();
//       const cards = await loader.getAllHarnesses(MatCardHarness);
//       expect(cards.length).toEqual(stubRestaurants.length);
//     });
//   });

//   describe('Search field', () => {
//     beforeEach(() => {
//       fixture.detectChanges();
//       inputEl = fixture.debugElement.query(By.css('input'));
//     });
//     it('Should render a search field', () => {
//       expect(inputEl).toBeTruthy();
//     });
//     it('Should return only Gosho Foods card with search value of "go"', () => {
//       let query: string = 'go';
//       restaurantServiceSpy.getAllRestaurants
//         .withArgs(query)
//         .and.returnValue(
//           of(
//             stubRestaurants.filter((x) => x.name.toLowerCase().includes(query))
//           )
//         );
//       inputEl.nativeElement.value = query;
//       inputEl.triggerEventHandler('keyup', {
//         target: inputEl.nativeElement,
//       });
//       fixture.detectChanges();
//       expect(restaurantServiceSpy.getAllRestaurants).toHaveBeenCalledTimes(2);
//       const cards = fixture.debugElement.queryAll(By.css('.mat-card'));
//       expect(cards.length).toBe(1);

//       const cardTitle = cards[0].query(By.css('.mat-card-title')).nativeElement
//         .textContent;
//       expect(cardTitle).toEqual('Gosho Foods');
//     });
//     it('Should render "No restaurants match your search" with invalid input', () => {
//       let query: string = 'asd';
//       restaurantServiceSpy.getAllRestaurants
//         .withArgs(query)
//         .and.returnValue(
//           of(
//             stubRestaurants.filter((x) => x.name.toLowerCase().includes(query))
//           )
//         );
//       inputEl.nativeElement.value = query;
//       inputEl.triggerEventHandler('keyup', {
//         target: inputEl.nativeElement,
//       });
//       fixture.detectChanges();
//       expect(restaurantServiceSpy.getAllRestaurants).toHaveBeenCalledTimes(2);

//       const heading = fixture.debugElement.query(By.css('h1')).nativeElement;
//       expect(heading.textContent).toContain('No restaurants match your search');
//     });
//     it('Should render 0 restaurants with invalid input and then 5 restaurants with invalid input deleted and empty string as input', () => {
//       let query: string = 'asd';
//       restaurantServiceSpy.getAllRestaurants
//         .withArgs(query)
//         .and.returnValue(
//           of(
//             stubRestaurants.filter((x) => x.name.toLowerCase().includes(query))
//           )
//         );
//       inputEl.nativeElement.value = query;
//       inputEl.triggerEventHandler('keyup', {
//         target: inputEl.nativeElement,
//       });
//       fixture.detectChanges();
//       expect(restaurantServiceSpy.getAllRestaurants).toHaveBeenCalledTimes(2);

//       const heading = fixture.debugElement.query(By.css('h1')).nativeElement;
//       expect(heading.textContent).toContain('No restaurants match your search');

//       restaurantServiceSpy.getAllRestaurants
//         .withArgs('')
//         .and.returnValue(of(stubRestaurants));
//       inputEl.nativeElement.value = '';
//       inputEl.triggerEventHandler('keyup', {
//         target: inputEl.nativeElement,
//       });
//       fixture.detectChanges();
//       expect(restaurantServiceSpy.getAllRestaurants).toHaveBeenCalledTimes(3);

//       const cards = fixture.debugElement.queryAll(By.css('.mat-card'));
//       expect(cards.length).toBe(stubRestaurants.length);
//     });
//   });
// });
