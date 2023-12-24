import {
  Reservation,
  RestaurantOverview,
  TableInfo,
} from './models/restaurant.model';

const allHomeViewRestaurants: RestaurantOverview[] = [
  // {
  //   id: 1,
  //   name: 'Gosho Foods',
  //   rating: 3.2,
  //   workingHours: {
  //     opens: '8:00',
  //     closes: '24:00',
  //   },
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   image:
  //     'https://media.voguebusiness.com/photos/5e6a53b415c34800089d2d2a/master/w_1600%2Cc_limit/fashion-restaurants-voguebus-justin-bridges-for-saks-fifth-avenue-mar-20-story-inline-1.jpg',
  // },
  // {
  //   id: 2,
  //   name: 'Random House Bistro',
  //   rating: 4.8,
  //   workingHours: {
  //     opens: '9:00',
  //     closes: '23:00',
  //   },
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   image:
  //     'https://media-cdn.tripadvisor.com/media/photo-s/1b/6b/33/12/getlstd-property-photo.jpg',
  // },
  // {
  //   id: 3,
  //   name: "Pesho's Beach Restaurant",
  //   rating: 5,
  //   workingHours: {
  //     opens: '10:00',
  //     closes: '24:00',
  //   },
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   image:
  //     'https://cdn.vox-cdn.com/thumbor/Mk0Z1KDHqDfayv5D4HLeUHpPIYM=/0x0:4608x3072/1200x800/filters:focal(1936x1168:2672x1904)/cdn.vox-cdn.com/uploads/chorus_image/image/70416025/shutterstock_1538500832.0.jpg',
  // },
  // {
  //   id: 4,
  //   name: "Franco's Diner",
  //   rating: 4.3,
  //   workingHours: {
  //     opens: '8:00',
  //     closes: '23:00',
  //   },
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   image:
  //     'https://greekcitytimes.com/wp-content/uploads/2017/07/Screen-Shot-2017-07-05-at-2.53.29-pm.png',
  // },
  // {
  //   id: 5,
  //   name: "Mama Grace's place",
  //   rating: 3.7,
  //   workingHours: {
  //     opens: '8:00',
  //     closes: '22:00',
  //   },
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   image:
  //     'https://upload.wikimedia.org/wikipedia/commons/6/63/Random_Restaurant_in_Isla_Mujeres.jpg',
  // },
];

const mockTables: TableInfo[] = [
  {
    id: 1,
    restaurantId: 1,
    tableNumber: 1,
    personCapacity: 4,

    description: 'Some desctiprion about a perfect dining table!',
  },
  {
    id: 2,
    restaurantId: 1,
    tableNumber: 2,
    personCapacity: 8,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 3,
    restaurantId: 1,
    tableNumber: 3,
    personCapacity: 5,
    description: 'Some desctiprion about a perfect dining table!',
  },
];

// const mockReservations: Reservation[] = [
//   {
//     id: 1,
//     restaurantId: 1,
//     completed: false,
//     customerName: 'Daniel Naydenov',
//     time: '2022-08-30T12:30:00',
//     tables: [],
//   },
//   {
//     id: 2,
//     restaurantId: 1,
//     completed: false,
//     customerName: 'Gosho Peshev',
//     time: '2022-08-25T14:40:00',
//     tables: [],
//   },
//   {
//     id: 3,
//     restaurantId: 1,
//     completed: false,
//     customerName: 'Pesho Goshev',
//     time: '2022-08-25T22:00:00',
//     tables: [],
//   },
//   {
//     id: 4,
//     restaurantId: 1,
//     completed: false,
//     customerName: 'Dragan Petkov',
//     time: '2022-08-26T11:00:00',
//     tables: [],
//   },
//   {
//     id: 4,
//     restaurantId: 1,
//     completed: false,
//     customerName: 'Dragan Petkov',
//     time: '2022-08-31T11:00:00',
//     tables: [],
//   },
//   {
//     id: 4,
//     restaurantId: 1,
//     completed: false,
//     customerName: 'Boris Karastanev',
//     time: '2022-08-29T11:00:00',
//     tables: [],
//   },
// ];

export default {
  allHomeViewRestaurants,
  mockTables,
  // mockReservations,
};
