import { Badge } from '@/components/ui/badge.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { AppType, LogsType } from '@/features/log/types/TLogs.ts';
import {
  APP_TYPE_DATA,
  LOGS_TYPE_DATA
} from '@/features/log/utils/logs-data.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';

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
  {
    accessorKey: 'message',
    header: () => <div>Message</div>,
    cell: ({ row }) => {
      const message = row.getValue('message') as string;
      return (
        <div
          style={{
            width: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip>
            <TooltipTrigger>
              <span className="w-[300px] cursor-pointer truncate underline decoration-dotted underline-offset-2">
                {message}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-sm whitespace-pre-wrap">{message}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Crée le',
    cell: ({ row }) => (
      <Badge className={'rounded bg-gray-200 p-1 text-gray-500'}>
        <Calendar />
        {dayjs(row.getValue('createdAt')).format('DD/MM/YYYY HH:mm')}
      </Badge>
    )
  }
];
