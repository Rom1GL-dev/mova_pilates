import SessionParticipantsProvider from '@/features/session/context/session-participants-provider.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { sessionParticipantsColumns } from '@/features/session/components/session-participant-column.tsx';
import { useListReservationsBySession } from '@/features/session/usecases/list-participant-by-session/use-list-reservations-by-session.tsx';
import { SessionParticipantListingToolbar } from '@/features/session/components/session-participants-toolbar.tsx';
import { SessionDialogs } from '@/features/session/components/session-participants-dialogs.tsx';
import { Loading } from '@/components/loading.tsx';

interface Props {
  sessionId: string;
}

export function SessionParticipantInformation({ sessionId }: Props) {
  const { data: sessionReservationsResponse, isLoading } =
    useListReservationsBySession(sessionId);
  const { data } = sessionReservationsResponse ?? {
    data: []
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SessionParticipantsProvider>
      <DataTable
        columns={sessionParticipantsColumns}
        data={data.reservations ?? []}
        Toolbar={SessionParticipantListingToolbar}
      />
      <SessionDialogs />
    </SessionParticipantsProvider>
  );
}
