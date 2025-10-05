import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { PackTableActions } from '@/features/pack/components/pack-table-actions.tsx';
import { TPack } from '@/features/pack/types/TPack.ts';

export const packColumns: ColumnDef<TPack>[] = [
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

  { accessorKey: 'label', header: 'Nom du cours', filterFn: 'includesString' },
  { accessorKey: 'nbCourse', header: 'Nombre de cours' },
  {
    accessorKey: 'price',
    header: 'Prix du cours',
    cell: ({ row }) => `${row.getValue('price')} €`
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: PackTableActions
  }
];
