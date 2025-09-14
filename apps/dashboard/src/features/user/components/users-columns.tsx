import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { TUser, UserRole } from '@/features/user/types/TUser.ts';
import { UserTableActions } from '@/features/user/components/user-table-actions.tsx';
import dayjs from 'dayjs';
import { USER_ROLE_DATA } from '@/features/user/utils/user-data.tsx';
import { Badge } from '@/components/ui/badge.tsx';

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
  {
    accessorKey: 'role',
    header: 'Rôle',
    cell: ({ row }) => {
      const userRole = USER_ROLE_DATA[row.getValue('role') as UserRole];
      return <Badge className={userRole.className}>{userRole.label}</Badge>;
    }
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
    id: 'actions',
    header: 'Actions',
    cell: UserTableActions
  }
];
