import UserReservationsProvider from '@/features/user/context/user-reservations-provider.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { userReservationsColumns } from '@/features/user/components/reservations/user-reservations-columns.tsx';
import { UserReservationsListingToolbar } from '@/features/user/components/reservations/user-reservations-listing-toolbar.tsx';
import { useListUserReservations } from '@/features/user/usecases/list-reservations/use-list-user-reservations.tsx';
import { Loading } from '@/components/loading.tsx';

interface Props {
  userId: string;
}

export function UserReservationsTab({ userId }: Props) {
  const { data: userReservationsResponse, isLoading } =
    useListUserReservations(userId);
  const { data: userReservations } = userReservationsResponse ?? {
    reservations: []
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <UserReservationsProvider>
      <DataTable
        columns={userReservationsColumns}
        data={userReservations.reservations}
        Toolbar={UserReservationsListingToolbar}
      />
    </UserReservationsProvider>
  );
}
