import { DataTableViewOptions } from '@/components/data-table/data-table-view-options.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableSearch } from '@/components/data-table/data-table-search.tsx';
import { TypeCourseCreateDialog } from '@/features/type-course/components/type-course-create-dialog.tsx';
import { DataTableFilter } from '@/components/data-table/data-table-filter';
import { TypeOfCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data.tsx';

interface Props {
  table: any;
}

export function TypeCourseListingToolbar({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className={'flex items-center gap-x-3'}>
        <DataTableViewOptions table={table} />
        <DataTableSearch column={'label'} table={table} />
        <DataTableFilter
          title="Type de cours"
          column="typeCourse"
          table={table}
          options={Object.values(TypeOfCourse).map((status) => ({
            label: TYPE_COURSE_DATA[status].label,
            value: status
          }))}
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Annuler
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <TypeCourseCreateDialog />
    </div>
  );
}
