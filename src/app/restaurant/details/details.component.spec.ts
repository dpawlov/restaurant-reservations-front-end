// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
// import { By } from '@angular/platform-browser';

// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';

// import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
// import { HarnessLoader } from '@angular/cdk/testing';
// import { MatTableHarness } from '@angular/material/table/testing';
// import { MatButtonHarness } from '@angular/material/button/testing';

// import { of, Subscription } from 'rxjs';

// import MockData from 'src/app/MockData';
// import { DetailsComponent } from './details.component';
// import { RestaurantService } from '../service/restaurant.service';
// import { RestaurantOverview, TableInfo } from 'src/app/models/restaurant.model';

// describe('DetailsComponent', () => {
//   let component: DetailsComponent;
//   let fixture: ComponentFixture<DetailsComponent>;
//   let loader: HarnessLoader;
//   let restaurantServiceSpy: jasmine.SpyObj<RestaurantService> =
//     jasmine.createSpyObj('RestaurantService', ['getById']);
//   let stubRestaurants: RestaurantOverview[] = MockData.allHomeViewRestaurants;
//   let stubTables: TableInfo[] = MockData.mockTables;
//   let route: ActivatedRoute;
//   let routeSub: Subscription;
//   let id: string;
//   let table: MatTableHarness;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [DetailsComponent],
//       imports: [MatTableModule, MatButtonModule, MatDialogModule],
//       providers: [
//         { provide: RestaurantService, useValue: restaurantServiceSpy },
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             paramMap: of(convertToParamMap({ id: '4' })),
//           },
//         },
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();

//     route = TestBed.inject(ActivatedRoute);
//     fixture = TestBed.createComponent(DetailsComponent);
//     loader = TestbedHarnessEnvironment.loader(fixture);
//     component = fixture.componentInstance;

//     routeSub = route.paramMap.subscribe(
//       (params: ParamMap) => (id = params.get('id')!)
//     );

//     restaurantServiceSpy.getById.withArgs(id).and.returnValue(
//       of({
//         ...stubRestaurants[Number(id) - 1],
//         tableInfo: stubTables,
//       })
//     );
//     table = await loader.getHarness(MatTableHarness);
//   });

//   describe('Without MaterialHarnesses', () => {
//     it('Should render the correct restaurant based on route id', () => {
//       const title = fixture.debugElement.query(By.css('.name')).nativeElement
//         .textContent;
//       expect(title)
//         .withContext('id = 4')
//         .toEqual(stubRestaurants[Number(id) - 1].name);
//     });

//     it('Should render coresponding restaurant image', () => {
//       const image = fixture.debugElement.query(By.css('img')).attributes;
//       const stubImageSrc = stubRestaurants[Number(id) - 1].image;
//       expect(image['src']).toEqual(stubImageSrc);
//     });
//   });

//   describe('Components with Material Harnesses', () => {
//     it('Should render a MatTable', async () => {
//       expect(table).toBeTruthy();
//     });

//     it('Should render a MatTable with a row for each table', async () => {
//       const tableRows = await table.getRows();
//       expect(tableRows.length).toEqual(stubTables.length);
//     });

//     // it('Should render a disabled MatButton if a table is reserved', async () => {
//     //   const reservedTable = stubTables.find((x) => x.isReserved);
//     //   const buttons = await table.getAllHarnesses(MatButtonHarness);
//     //   expect(buttons.length).toEqual(stubTables.length);
//     //   const isTargetButtonDisabled = await buttons[
//     //     reservedTable?.tableNumber! - 1
//     //   ].isDisabled();
//     //   expect(isTargetButtonDisabled).toBeTrue();
//     // });

//     // it('Should render an enabled MatButton if a table is free', async () => {
//     //   const freeTable = stubTables.find((x) => !x.isReserved);
//     //   const buttons = await table.getAllHarnesses(MatButtonHarness);
//     //   expect(buttons.length).toEqual(stubTables.length);
//     //   const isTargetButtonDisabled = await buttons[
//     //     freeTable?.tableNumber! - 1
//     //   ].isDisabled();
//     //   expect(isTargetButtonDisabled).toBeFalse();
//     // });

//     it('Should have each MatTable row displaying the coresponding table info', async () => {
//       const tableRows = await table.getRows();
//       const tableRowInfo = await tableRows[0].getCellTextByColumnName();
//       const stubTable = stubTables.find(
//         (x) => x.tableNumber === Number(tableRowInfo['tableNumber'])
//       );
//       expect(tableRowInfo['description']).toEqual(stubTable?.description!);
//       expect(Number(tableRowInfo['tableNumber'])).toEqual(
//         stubTable?.tableNumber!
//       );
//       expect(tableRowInfo['personCapacity']).toContain(
//         `${stubTable?.personCapacity} people`
//       );
//     });
//   });

//   describe('Error fallback/ no-data template', () => {
//     it('Should render "#noRestaurant" template when server call fails', () => {
//       restaurantServiceSpy.getById.withArgs(id).and.returnValue(of());
//       component.ngOnInit();
//       fixture.detectChanges();
//       const el = fixture.debugElement.query(By.css('.error-image'));
//       expect(el).toBeTruthy();
//       expect(el.attributes['src']).toEqual(
//         'https://image.shutterstock.com/image-vector/404-error-page-funny-design-260nw-1761026456.jpg'
//       );
//     });
//     it('Should render a table with only one row with "no-data" message when no tables are present', async () => {
//       restaurantServiceSpy.getById.withArgs(id).and.returnValue(
//         of({
//           ...stubRestaurants[Number(id) - 1],
//           tableInfo: [],
//         })
//       );
//       component.ngOnInit();
//       table = await loader.getHarness(MatTableHarness);
//       const tableRows = await table.getRows();
//       expect(tableRows.length).toBe(1);
//       const tableRowInfo = await tableRows[0].getCellTextByIndex();
//       expect(tableRowInfo[0]).toEqual('No free tables available !');
//     });
//   });

//   afterEach(() => {
//     routeSub.unsubscribe();
//     fixture.destroy();
//   });
// });
