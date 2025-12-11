import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useSessionParticipants } from '@/features/session/context/session-participants-provider.tsx';
import { Row } from '@tanstack/react-table';
import { TSessionParticipants } from '@/features/session/types/TSessionParticipants.ts';
import { Trash } from 'lucide-react';

interface Props {
  row: Row<TSessionParticipants>;
}

export function SessionParticipantsTableActions({ row }: Props) {
  const { setOpen, setCurrentRow } = useSessionParticipants();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted ml-auto flex h-8 w-8 cursor-pointer p-0"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="!text-red-500"
            onClick={() => {
              setOpen('delete');
              setCurrentRow(row.original);
            }}
          >
            Supprimer
            <DropdownMenuShortcut>
              <Trash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
