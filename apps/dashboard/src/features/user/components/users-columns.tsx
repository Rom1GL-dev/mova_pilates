import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { TUser, UserRole } from '@/features/user/types/TUser.ts';
import { UserTableActions } from '@/features/user/components/user-table-actions.tsx';
import dayjs from 'dayjs';
import { USER_ROLE_DATA } from '@/features/user/utils/user-data.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Calendar } from 'lucide-react';

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
  { accessorKey: 'firstname', header: 'Prénom', filterFn: 'includesString' },
  {
    accessorKey: 'lastname',
    header: 'Nom de famille',
    filterFn: 'includesString'
  },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'tel', header: 'Tel' },
  {
    accessorKey: 'dob',
    header: 'Crée le',
    cell: ({ row }) => (
      <Badge className={'rounded bg-gray-200 p-1 text-gray-500'}>
        <Calendar />
        {dayjs(row.getValue('createdAt')).format('DD/MM/YYYY HH:mm')}
      </Badge>
    )
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: UserTableActions
  }
];
