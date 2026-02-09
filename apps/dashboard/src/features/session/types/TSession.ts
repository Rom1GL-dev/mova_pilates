export interface TSession {
  id: string;
  startDate: Date;
  endDate: Date;
  typeCourseId: string;
  customCapacity?: number;
  guestCount?: number;
}
