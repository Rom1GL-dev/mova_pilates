import { DataTable } from '@/components/data-table/data-table.tsx';
import Layout from '@/components/layout.tsx';
import { logsColumns } from '@/features/log/components/logs-columns.tsx';
import { LogsListingToolbar } from '@/features/log/components/logs-listing-toolbar.tsx';
import { useListLogs } from '@/features/log/usecases/list-logs/use-list-logs.tsx';

export function Logs() {
  const { data: logsResponse } = useListLogs();
  const { data } = logsResponse ?? {
    data: []
  };

  return (
    <Layout
      breadcrumbs={['Logs']}
      title={'Liste des logs'}
      description={'Retrouvrez la liste de tous les logs'}
    >
      <DataTable
        columns={logsColumns}
        data={data.logs ?? []}
        Toolbar={LogsListingToolbar}
      />
    </Layout>
  );
}
