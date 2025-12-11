import { Badge } from '@/components/ui/badge.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { UserReservationsTableActions } from '@/features/user/components/reservations/user-reservations-table-actions.tsx';
import { UserReservations } from '@/features/user/types/TUserReservations.ts';
import { cn } from '@/lib/utils.ts';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data.tsx';
import { TypeOfCourse } from '@/features/type-course/types/TTypeCourse.ts';

export const userReservationsColumns: ColumnDef<UserReservations>[] = [
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
    accessorKey: 'typeCourseLabel',
    header: 'Type de cours',
    cell: ({ row }) => {
      const { session } = row.original;
      const typeCourseData =
        TYPE_COURSE_DATA[
          session.typeCourse.capacity > 1
            ? TypeOfCourse.COLLECTIVE
            : TypeOfCourse.INDIVUDUAL
        ];
      return (
        <div className={'flex items-center gap-x-2'}>
          {session.typeCourse.label}
          <Badge className={cn(typeCourseData.className, 'rounded px-2')}>
            {typeCourseData.label}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: 'startDate',
    header: 'Date de début',
    cell: ({ row }) => {
      const { session } = row.original;

      return (
        <Badge className="rounded bg-gray-200 p-1 text-gray-500">
          <Calendar />
          {dayjs(session.startDate).format('DD/MM/YYYY HH:mm')}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'endDate',
    header: 'Date de fin',
    cell: ({ row }) => {
      const { session } = row.original;
      return (
        <Badge className="rounded bg-gray-200 p-1 text-gray-500">
          <Calendar />
          {dayjs(session.endDate).format('DD/MM/YYYY HH:mm')}
        </Badge>
      );
    }
  },

  {
    accessorKey: 'createdAt',
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
    cell: UserReservationsTableActions
  }
];
