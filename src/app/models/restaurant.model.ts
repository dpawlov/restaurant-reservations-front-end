export interface RestaurantOverview {
  id: number;
  name: string;
  rating: number;
  description: string;
  workingTimes: workingTimes[];
  image: string;
}

export interface workingTimes {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface TableInfo {
  id: number;
  restaurantId?: number;
  tableNumber?: number;
  personCapacity?: number;
  description?: string;
}

export interface Reservation {
  id?: number;
  userId?: number;
  restaurantId: number;
  customerName: string;
  customerPhone: string;
  persons: number;
  isCompleted?: boolean;
  time: string;
  tables: TableInfo[];
}

export interface RestaurantDetails extends RestaurantOverview {
  tableInfo: TableInfo[];
}
