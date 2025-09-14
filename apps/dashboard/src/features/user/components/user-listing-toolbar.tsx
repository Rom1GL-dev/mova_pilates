import { DataTableViewOptions } from '@/components/data-table/data-table-view-options.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableSearch } from '@/components/data-table/data-table-search.tsx';
import { UserCreateDialog } from '@/features/user/components/user-create-dialog.tsx';
import { DataTableFilter } from '@/components/data-table/data-table-filter.tsx';
import { USER_ROLE_DATA } from '@/features/user/utils/user-data.tsx';
import { UserRole } from '@/features/user/types/TUser.ts';

interface Props {
  table: any;
}

export function UserListingToolbar({ table }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className={'flex items-center gap-x-3'}>
        <DataTableViewOptions table={table} />
        <DataTableSearch column={'firstname'} table={table} />
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
      <UserCreateDialog />
    </div>
  );
}
