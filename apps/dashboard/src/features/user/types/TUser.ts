export interface TUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  tel: string;
  dob: string;
  createdAt: Date;
  updatedAt?: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
