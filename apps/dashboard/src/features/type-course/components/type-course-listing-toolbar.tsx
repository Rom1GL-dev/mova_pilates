import { DataTableFilter } from '@/components/data-table/data-table-filter';
import { DataTableSearch } from '@/components/data-table/data-table-search.tsx';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TypeCourseCreateDialog } from '@/features/type-course/components/type-course-create-dialog.tsx';
import { TypeOfCourse } from '@/features/type-course/types/TTypeCourse';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data';
import { Cross2Icon } from '@radix-ui/react-icons';

interface Props {
  table: any;
}

export function TypeCourseListingToolbar({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className={'flex items-center gap-x-3'}>
        <DataTableViewOptions table={table} />
        <DataTableSearch table={table} />
        <DataTableFilter
          table={table}
          column="typeCourse"
          title="Type de cours"
          options={Object.values(TypeOfCourse).map((typeCourse) => {
            return {
              label: TYPE_COURSE_DATA[typeCourse].label,
              value: typeCourse
            };
          })}
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
