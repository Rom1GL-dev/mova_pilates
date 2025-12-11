'use client';

import { DataTableFilter } from '@/components/data-table/data-table-filter';
import { DataTableSearch } from '@/components/data-table/data-table-search.tsx';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TypeCourseCreateDialog } from '@/features/type-course/components/type-course-create-dialog.tsx';
import { TypeOfCourse } from '@/features/type-course/types/TTypeCourse';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import * as React from 'react';

interface Props {
  table: any;
}

export function TypeCourseListingToolbar({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isMobile = useIsMobile();
  const [openFilters, setOpenFilters] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <DataTableSearch table={table} />
          {!isMobile && (
            <div className="flex items-center gap-x-3">
              <DataTableFilter
                table={table}
                column="typeCourse"
                title="Type de cours"
                options={Object.values(TypeOfCourse).map((typeCourse) => ({
                  label: TYPE_COURSE_DATA[typeCourse].label,
                  value: typeCourse
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
          )}
        </div>

        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpenFilters((prev) => !prev)}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                openFilters ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </Button>
        )}

        {!isMobile && (
          <div className="flex flex-1 justify-end">
            <TypeCourseCreateDialog />
          </div>
        )}
      </div>

      {isMobile && openFilters && (
        <div className="flex w-full flex-col gap-4 rounded-md bg-[#f3e8de] p-4 shadow-sm">
          <DataTableFilter
            table={table}
            column="typeCourse"
            title="Type de cours"
            options={Object.values(TypeOfCourse).map((typeCourse) => ({
              label: TYPE_COURSE_DATA[typeCourse].label,
              value: typeCourse
            }))}
          />

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2"
            >
              Réinitialiser les filtres
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}

          <TypeCourseCreateDialog />
        </div>
      )}
    </div>
  );
}
