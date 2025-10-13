import { Badge } from '@/components/ui/badge.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { TypeCourseTableActions } from '@/features/type-course/components/type-course-table-actions.tsx';
import {
  TTypeCourse,
  TypeOfCourse
} from '@/features/type-course/types/TTypeCourse.ts';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data.tsx';
import { ColumnDef } from '@tanstack/react-table';

export const typeCourseColumns: ColumnDef<TTypeCourse>[] = [
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

  { accessorKey: 'label', header: 'Nom du cours' },
  { accessorKey: 'capacity', header: 'Capacité de personne' },
  {
    accessorKey: 'typeCourse',
    header: 'Type de cours',
    cell: ({ row }) => {
      const { capacity } = row.original;
      const typeCourseRole =
        TYPE_COURSE_DATA[
          capacity > 1 ? 'COLLECTIVE' : ('INDIVIDUAL' as TypeOfCourse)
        ];
      return (
        <Badge className={typeCourseRole.className}>
          {typeCourseRole.label}
        </Badge>
      );
    }
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: TypeCourseTableActions
  }
];
