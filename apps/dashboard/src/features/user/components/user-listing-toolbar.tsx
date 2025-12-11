'use client';

import { DataTableViewOptions } from '@/components/data-table/data-table-view-options.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableSearch } from '@/components/data-table/data-table-search.tsx';
import { UserCreateDialog } from '@/features/user/components/user-create-dialog.tsx';
import { DataTableFilter } from '@/components/data-table/data-table-filter.tsx';
import { USER_ROLE_DATA } from '@/features/user/utils/user-data.tsx';
import { UserRole } from '@/features/user/types/TUser.ts';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import * as React from 'react';

interface Props {
  table: any;
}

export function UserListingToolbar({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isMobile = useIsMobile();
  const [openFilters, setOpenFilters] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      {/* ------- TOP BAR ------- */}
      <div className="flex w-full items-center justify-between">
        {/* Left side: View options + Search */}
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <DataTableSearch table={table} />
          {!isMobile && (
            <div className="flex items-center gap-x-3">
              <DataTableFilter
                title="Rôle"
                column="role"
                table={table}
                options={Object.values(UserRole).map((status) => ({
                  label: USER_ROLE_DATA[status].label,
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
          )}
        </div>

        {/* Mobile chevron */}
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

        {/* Desktop add user button */}
        {!isMobile && (
          <div className="flex flex-1 justify-end">
            <UserCreateDialog />
          </div>
        )}
      </div>

      {/* ------- MOBILE FILTER PANEL ------- */}
      {isMobile && openFilters && (
        <div className="flex w-full flex-col gap-4 rounded-md bg-[#f3e8de] p-4 shadow-sm">
          <DataTableFilter
            title="Rôle"
            column="role"
            table={table}
            options={Object.values(UserRole).map((status) => ({
              label: USER_ROLE_DATA[status].label,
              value: status
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

          <UserCreateDialog />
        </div>
      )}
    </div>
  );
}
