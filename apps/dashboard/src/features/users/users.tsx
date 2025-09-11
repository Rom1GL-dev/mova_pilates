import { DataTable } from '@/components/data-table/data-table.tsx';
import { useListUsers } from '@/features/users/usecases/list-users/use-list-users.tsx';
import UserProvider from '@/features/users/context/user-provider.tsx';
import { usersColumns } from '@/features/users/components/users-columns.tsx';
import { UserListingToolbar } from '@/features/users/components/user-listing-toolbar.tsx';
import { UserDialogs } from './components/user-dialogs.tsx';
import Layout from '@/components/layout.tsx';

export function Users() {
  const { data: usersResponse } = useListUsers();
  const { data } = usersResponse ?? {
    data: []
  };

  return (
    <Layout title={'Utilisateurs'}>
      <UserProvider>
        <DataTable
          columns={usersColumns}
          data={data.users ?? []}
          Toolbar={UserListingToolbar}
        />
        <UserDialogs />
      </UserProvider>
    </Layout>
  );
}
