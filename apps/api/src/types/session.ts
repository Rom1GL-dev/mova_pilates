import { Role } from '@mova_pilates/shared';

export interface Session {
  id: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    dob: Date | null;
    tel: string;
    role: Role;
  };
}
