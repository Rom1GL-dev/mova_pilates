export interface TUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt?: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
