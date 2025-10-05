import { DataTable } from '@/components/data-table/data-table.tsx';
import { logsColumns } from '@/features/logs/components/logs-columns.tsx';
import { LogsListingToolbar } from '@/features/logs/components/logs-listing-toolbar.tsx';
import { useGetLogs } from '@/features/logs/usecases/get-type-course/use-get-logs.tsx';

interface Props {
  userId: string;
}

export function UserLogs({ userId }: Props) {
  const { data: logsResponse } = useGetLogs(userId);
  const { data } = logsResponse ?? {
    data: []
  };

  return (
    <div>
      {' '}
      <DataTable
        columns={logsColumns}
        data={data.logs ?? []}
        Toolbar={LogsListingToolbar}
      />
    </div>
  );
}
