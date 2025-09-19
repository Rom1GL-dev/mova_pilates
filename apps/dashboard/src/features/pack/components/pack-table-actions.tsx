import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Edit, Trash } from 'lucide-react';
import { Row } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.tsx';
import { usePack } from '@/features/pack/context/pack-provider.tsx';
import { TPack } from '@/features/pack/types/TPack.ts';

interface Props {
  row: Row<TPack>;
}

export function PackTableActions({ row }: Props) {
  const { setOpen, setCurrentRow } = usePack();

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
          <Link to={APP_ROUTES.packs.getHref() + '/' + row.original.id}>
            <DropdownMenuItem
              onClick={() => {
                setOpen('edit');
                setCurrentRow(row.original);
              }}
            >
              Modifier
              <DropdownMenuShortcut>
                <Edit size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
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
