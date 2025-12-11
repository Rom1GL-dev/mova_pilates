import { DataTableSearch } from '@/components/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableFilter } from '@/components/data-table/data-table-filter.tsx';
import { SESSION_PARTICIPANT_RESERVATION_STATUS_DATA } from '@/features/session/utils/type-course-data.tsx';
import { SessionParticipantAddParticipant } from '@/features/session/components/session-participant-add-participant.tsx';
import { useParams } from 'react-router-dom';

interface Props {
  table: any;
  data?: any;
}

export function SessionParticipantListingToolbar({ table, data }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { id } = useParams();
  console.log(id);
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-x-3">
        <DataTableViewOptions table={table} />
        <DataTableSearch table={table} />
        <DataTableFilter
          title={'Status'}
          options={Object.values(
            SESSION_PARTICIPANT_RESERVATION_STATUS_DATA
          ).map((status) => ({
            label: status.label,
            value: status.value
          }))}
          column={'reservationStatus'}
          table={table}
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Annuler
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <SessionParticipantAddParticipant
        sessionId={id ?? ''}
        disabled={data[0] && data.length >= data[0].capacity}
      />
    </div>
  );
}
