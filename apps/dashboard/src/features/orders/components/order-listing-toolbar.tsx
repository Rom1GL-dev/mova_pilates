'use client';

import { DataTableViewOptions } from '@/components/data-table/data-table-view-options.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableSearch } from '@/components/data-table/data-table-search.tsx';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import * as React from 'react';
import { DataTableFilter } from '@/components/data-table/data-table-filter.tsx';

interface Props {
  table: any;
}

export function OrderListingToolbar({ table }: Props) {
  const isMobile = useIsMobile();
  const isFiltered = table.getState().columnFilters.length > 0;
  const [openFilters, setOpenFilters] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <DataTableSearch table={table} />
          <DataTableFilter
            title={'Status'}
            options={[
              { label: 'Succès', value: 'SUCCESS' },
              { label: 'Échec', value: 'FAILED' }
            ]}
            column={'status'}
            table={table}
          />
          {!isMobile && (
            <div className="flex items-center gap-x-3">
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
      </div>

      {isMobile && openFilters && (
        <div className="flex w-full flex-col gap-4 rounded-md bg-[#f3e8de] p-4 shadow-sm">
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
        </div>
      )}
    </div>
  );
}
