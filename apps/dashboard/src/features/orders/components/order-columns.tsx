import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { TOrder } from '@/features/orders/types/TOrder.ts';

export const orderColumns: ColumnDef<TOrder>[] = [
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

  { accessorKey: 'userFullName', header: 'Utilisateur' },
  { accessorKey: 'packName', header: 'Nom du pack' },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => {
      const { amount } = row.original;
      const formattedAmount =
        (amount / 100).toFixed(2).replace('.', ',') + ' €';
      return formattedAmount;
    }
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original;
      const statusName = status === 'SUCCESS' ? 'Succès' : 'Échec';
      return (
        <Badge
          className={
            status === 'SUCCESS'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }
        >
          {statusName}
        </Badge>
      );
    }
  }
];
