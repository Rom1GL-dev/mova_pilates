import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { TUser, UserRole } from '@/features/users/types/TUser.ts';
import { UserTableActions } from '@/features/users/components/user-table-actions.tsx';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge.tsx';
import { USER_ROLE_DATA } from '@/features/users/utils/user-data.tsx';

export const usersColumns: ColumnDef<TUser>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  { accessorKey: 'firstname', header: 'Prénom' },
  { accessorKey: 'lastname', header: 'Nom de famille' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'dob',
    header: 'Date de naissance',
    cell: ({ row }) => (
      <span>{dayjs(row.getValue('dob')).format('DD/MM/YYYY')}</span>
    )
  },

  { accessorKey: 'tel', header: 'Numéro' },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const userRole = USER_ROLE_DATA[row.getValue('role') as UserRole];
      return <Badge className={userRole.className}>{userRole.label}</Badge>;
    }
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: UserTableActions
  }
];
