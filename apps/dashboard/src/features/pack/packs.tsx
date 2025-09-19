import { DataTable } from '@/components/data-table/data-table.tsx';
import { PackDialogs } from './components/pack-dialogs.tsx';
import Layout from '@/components/layout.tsx';
import PackProvider from '@/features/pack/context/pack-provider.tsx';
import { packColumns } from './components/pack-columns.tsx';
import { useListPacks } from '@/features/pack/usecases/list-pack/use-list-packs.tsx';
import { PackListingToolbar } from '@/features/pack/components/pack-listing-toolbar.tsx';

export function Packs() {
  const { data: packResponse } = useListPacks();
  const { data } = packResponse ?? {
    data: []
  };

  return (
    <Layout
      breadcrumbs={['Packs']}
      title={'Liste des différents packs'}
      description={'Retrouvrez la liste de tous les packs'}
    >
      <PackProvider>
        <DataTable
          columns={packColumns}
          data={data.packs ?? []}
          Toolbar={PackListingToolbar}
        />
        <PackDialogs />
      </PackProvider>
    </Layout>
  );
}
