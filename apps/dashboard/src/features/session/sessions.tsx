import { DataTable } from '@/components/data-table/data-table.tsx';
import { SessionDialogs } from './components/session-dialogs.tsx';
import Layout from '@/components/layout.tsx';
import { sessionColumns } from './components/session-columns.tsx';
import SessionProvider from '@/features/session/context/session-provider.tsx';
import { SessionListingToolbar } from '@/features/session/components/session-listing-toolbar.tsx';
import { useListSession } from '@/features/session/usecases/list-session/use-list-session.tsx';

export function Sessions() {
  const { data: sessionResponse } = useListSession();
  const { data } = sessionResponse ?? {
    data: []
  };

  return (
    <Layout
      breadcrumbs={['Sessions']}
      title={'Liste des différentes sessions'}
      description={'Retrouvrez la liste de tous les sessions'}
    >
      <SessionProvider>
        <DataTable
          columns={sessionColumns}
          data={data.sessions ?? []}
          Toolbar={SessionListingToolbar}
        />
        <SessionDialogs />
      </SessionProvider>
    </Layout>
  );
}
