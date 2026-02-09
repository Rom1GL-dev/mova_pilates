import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { SessionColumnTypeCourseCapacity } from '@/features/session/components/session-column-type-course-capacity';
import { SessionColumnTypeCourse } from '@/features/session/components/session-column-type-course.tsx';
import { SessionTableActions } from '@/features/session/components/session-table-actions.tsx';
import { TSession } from '@/features/session/types/TSession.ts';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';

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

  {
    accessorKey: 'typeCourseId',
    header: 'Type de cours',
    cell: ({ row }) => {
      return (
        <>
          <SessionColumnTypeCourse
            typeCourseId={row.getValue('typeCourseId')}
          />
        </>
      );
    }
  },
  {
    accessorKey: 'typeCourseCapacity',
    header: 'Capacité',
    cell: ({ row }) => {
      const { typeCourseId, id, customCapacity } = row.original;
      return (
        <>
          <SessionColumnTypeCourseCapacity
            typeCourseId={typeCourseId}
            sessionId={id}
            customCapacity={customCapacity}
          />
        </>
      );
    }
  },

  {
    accessorKey: 'startDate',
    header: 'Date de début',
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.start && !filterValue?.end) return true;

      const rowDate = new Date(row.getValue(columnId));
      if (isNaN(rowDate.getTime())) return true;

      const start = filterValue.start ? new Date(filterValue.start) : null;
      const end = filterValue.end ? new Date(filterValue.end) : null;

      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);

      if (start && rowDate < start) return false;
      if (end && rowDate > end) return false;

      return true;
    },

    cell: ({ row }) => (
      <Badge className={'rounded bg-gray-200 p-1 text-gray-500'}>
        <Calendar />
        {dayjs(row.getValue('startDate')).format('DD/MM/YYYY HH:mm')}
      </Badge>
    )
  },
  {
    accessorKey: 'endDate',
    header: 'Date de fin',
    cell: ({ row }) => (
      <Badge className={'rounded bg-gray-200 p-1 text-gray-500'}>
        <Calendar />
        {dayjs(row.getValue('endDate')).format('DD/MM/YYYY HH:mm')}
      </Badge>
    )
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: SessionTableActions
  }
];
