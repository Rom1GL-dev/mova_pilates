import { DataTableViewOptions } from '@/components/data-table/data-table-view-options.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableSearch } from '@/components/data-table/data-table-search.tsx';
import { DataTableFilter } from '@/components/data-table/data-table-filter.tsx';
import { AppType, LogsType } from '@/features/log/types/TLogs.ts';
import {
  APP_TYPE_DATA,
  LOGS_TYPE_DATA
} from '@/features/log/utils/logs-data.tsx';

interface Props {
  table: any;
}

export function LogsListingToolbar({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className={'flex items-center gap-x-3'}>
        <DataTableViewOptions table={table} />
        <DataTableSearch table={table} />
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
    </div>
  );
}
