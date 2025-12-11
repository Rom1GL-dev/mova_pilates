export interface UserReservationSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  typeCourseId: string;
  typeCourse: {
    label: string;
    capacity: number;
  };
  status: string;
}

export interface UserReservationUser {
  id: string;
  userId: string;
}

export interface UserReservations {
  id: string;
  createdAt: string;
  expiredAt: string | null;
  session: UserReservationSession;
  user: UserReservationUser;
}
