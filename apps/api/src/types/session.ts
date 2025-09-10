import { Role } from '@mova_pilates/shared';

export interface Session {
  id: string;
  user: {
    email: string;
    firstname: string;
    lastname: string;
    role: Role;
  };
}
