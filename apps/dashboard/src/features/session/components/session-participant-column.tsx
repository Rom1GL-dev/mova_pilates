import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { TSessionParticipants } from '@/features/session/types/TSessionParticipants.ts';
import { SessionParticipantsTableActions } from '@/features/session/components/session-participants-table-actions.tsx';
import { SessionParticipantsReservationStatus } from '@/features/session/components/session-participants-reservation-status.tsx';

export const sessionParticipantsColumns: ColumnDef<TSessionParticipants>[] = [
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

  {
    accessorKey: 'firstname',
    header: 'Prénom',
    cell: ({ row }) => {
      const { firstname } = row.original;
      return <>{firstname}</>;
    }
  },
  {
    accessorKey: 'lastname',
    header: 'Nom',
    cell: ({ row }) => {
      const { lastname } = row.original;
      return <>{lastname}</>;
    }
  },
  {
    accessorKey: 'reservationStatus',
    header: 'Statut de réservation',
    cell: ({ row }) => {
      const { reservationStatus, reservationId } = row.original;
      return (
        <SessionParticipantsReservationStatus
          reservationStatus={reservationStatus}
          reservationId={reservationId}
        />
      );
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: SessionParticipantsTableActions
  }
];
