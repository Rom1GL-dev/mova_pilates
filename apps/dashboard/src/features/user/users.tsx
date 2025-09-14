import { DataTable } from '@/components/data-table/data-table.tsx';
import { useListUsers } from '@/features/user/usecases/list-users/use-list-users.tsx';
import UserProvider from '@/features/user/context/user-provider.tsx';
import { usersColumns } from '@/features/user/components/users-columns.tsx';
import { UserListingToolbar } from '@/features/user/components/user-listing-toolbar.tsx';
import { UserDialogs } from './components/user-dialogs.tsx';
import Layout from '@/components/layout.tsx';

export function Users() {
  const { data: usersResponse } = useListUsers();
  const { data } = usersResponse ?? {
    data: []
  };

  return (
    <Layout
      breadcrumbs={['Utilisateurs']}
      title={'Liste des utilisateurs'}
      description={'Retrouvrez la liste de tous les clients / administrateurs'}
    >
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
