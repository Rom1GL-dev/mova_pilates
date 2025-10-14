import { DataTableSearch } from '@/components/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { SessionCreateDialog } from '@/features/session/components/session-create-dialog';
import { cn } from '@/lib/utils';
import { Cross2Icon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  table: any;
}

export function SessionListingToolbar({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    table.getColumn('startDate')?.setFilterValue({
      start: range?.from ? range.from.toISOString() : null,
      end: range?.to ? range.to.toISOString() : null
    });
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-x-3">
        <DataTableViewOptions table={table} />
        <DataTableSearch table={table} />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn('h-8 justify-start px-2 text-left lg:px-3')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'dd/MM/yyyy', { locale: fr })} -{' '}
                    {format(dateRange.to, 'dd/MM/yyyy', { locale: fr })}
                  </>
                ) : (
                  format(dateRange.from, 'dd/MM/yyyy', { locale: fr })
                )
              ) : (
                <span>Du / Au</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateChange}
              numberOfMonths={2}
              locale={fr}
            />
          </PopoverContent>
        </Popover>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setDateRange(undefined);
            }}
            className="h-8 px-2 lg:px-3"
          >
            Annuler
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <SessionCreateDialog />
    </div>
  );
}
