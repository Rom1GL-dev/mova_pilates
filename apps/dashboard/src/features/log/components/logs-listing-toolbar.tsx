'use client';

import { DataTableFilter } from '@/components/data-table/data-table-filter';
import { DataTableSearch } from '@/components/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { AppType, LogsType } from '@/features/log/types/TLogs';
import { APP_TYPE_DATA, LOGS_TYPE_DATA } from '@/features/log/utils/logs-data';
import { cn } from '@/lib/utils';
import { Cross2Icon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  table: any;
}

export function LogsListingToolbar({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isMobile = useIsMobile();

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [openFilters, setOpenFilters] = React.useState(false);

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    table.getColumn('createdAt')?.setFilterValue({
      start: range?.from ? range.from.toISOString() : null,
      end: range?.to ? range.to.toISOString() : null
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className={'flex items-center gap-2'}>
          <DataTableViewOptions table={table} />

          <DataTableSearch table={table} />
          {!isMobile && (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-x-3">
                <DataTableFilter
                  title="Type d'application"
                  column="appType"
                  table={table}
                  options={Object.values(AppType).map((status) => ({
                    label: APP_TYPE_DATA[status].label,
                    value: status
                  }))}
                />

                <DataTableFilter
                  title="Type de logs"
                  column="logType"
                  table={table}
                  options={Object.values(LogsType).map((status) => ({
                    label: LOGS_TYPE_DATA[status].label,
                    value: status
                  }))}
                />

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
                            {format(dateRange.from, 'dd/MM/yyyy', {
                              locale: fr
                            })}{' '}
                            -{' '}
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
              className={cn(
                'h-5 w-5 transition-transform',
                openFilters ? 'rotate-180' : 'rotate-0'
              )}
            />
          </Button>
        )}
      </div>

      {isMobile && openFilters && (
        <div className="flex w-full flex-col gap-4 rounded-md bg-[#f3e8de] p-4 shadow-sm">
          <DataTableViewOptions table={table} />

          <DataTableFilter
            title="Type d'application"
            column="appType"
            table={table}
            options={Object.values(AppType).map((status) => ({
              label: APP_TYPE_DATA[status].label,
              value: status
            }))}
          />

          <DataTableFilter
            title="Type de logs"
            column="logType"
            table={table}
            options={Object.values(LogsType).map((status) => ({
              label: LOGS_TYPE_DATA[status].label,
              value: status
            }))}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn('h-8 justify-center px-2')}
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
                numberOfMonths={1}
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
