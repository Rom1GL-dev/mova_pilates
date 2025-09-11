import { UserRole } from '@/features/users/types/TUser.ts';

export const USER_ROLE_DATA = {
  [UserRole.USER]: {
    label: 'Utilisateur',
    className: 'bg-blue-200 text-blue-800'
  },
  [UserRole.ADMIN]: {
    label: 'Administrateur',
    className: 'bg-green-200 text-green-800'
  }
};
