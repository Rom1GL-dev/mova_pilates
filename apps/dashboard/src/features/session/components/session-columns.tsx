import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { TSession } from '@/features/session/types/TSession.ts';
import dayjs from 'dayjs';
import { SessionTableActions } from '@/features/session/components/session-table-actions.tsx';

export const sessionColumns: ColumnDef<TSession>[] = [
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

  { accessorKey: 'typeCourseId', header: 'Type de cours' },
  {
    accessorKey: 'startDate',
    header: 'Date de début',
    cell: ({ row }) =>
      dayjs(row.getValue('startDate')).format('DD/MM/YYYY HH:mm')
  },
  {
    accessorKey: 'endDate',
    header: 'Date de fin',
    cell: ({ row }) => dayjs(row.getValue('endDate')).format('DD/MM/YYYY HH:mm')
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: SessionTableActions
  }
];
