import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { Badge } from '@/components/ui/badge.tsx';
import {
  APP_TYPE_DATA,
  LOGS_TYPE_DATA
} from '@/features/log/utils/logs-data.tsx';
import { AppType, LogsType } from '@/features/log/types/TLogs.ts';

export const logsColumns: ColumnDef<TTypeCourse>[] = [
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

  { accessorKey: 'fullName', header: 'Utilisateur' },
  {
    accessorKey: 'appType',
    header: "Type d'application",
    cell: ({ row }) => {
      const appType = row.getValue('appType') as string;
      const appTypeData = APP_TYPE_DATA[appType as AppType];
      const Icon = appTypeData.icon;

      return (
        <Badge className={appTypeData.className}>
          <Icon /> {appTypeData.label}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'logType',
    header: 'Type de logs',
    cell: ({ row }) => {
      const logType = row.getValue('logType') as string;
      const logTypeData = LOGS_TYPE_DATA[logType as LogsType];

      return (
        <Badge className={logTypeData.className}>{logTypeData.label}</Badge>
      );
    }
  },
  { accessorKey: 'message', header: 'Message' }
];
