// import { TestBed } from '@angular/core/testing';

// import { of } from 'rxjs';

// import { RestaurantService } from './restaurant.service';
// import { RestaurantOverview } from 'src/app/models/restaurant.model';
// import MockData from 'src/app/MockData';

// describe('HomeService', () => {
//   let service: RestaurantService;
//   const stubValue: RestaurantOverview[] = MockData.allHomeViewRestaurants;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(RestaurantService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('Should fetch 5 restaurants', (done: DoneFn) => {
//     const valueServiceSpy = jasmine.createSpyObj('RestaurantService', [
//       'getAllRestauratns',
//     ]);

//     valueServiceSpy.getAllRestauratns.and.returnValue(of(stubValue));
//     service.getAllRestaurants().subscribe((res) => {
//       expect(res).toEqual(stubValue);
//       done();
//     });
//   });
// });
