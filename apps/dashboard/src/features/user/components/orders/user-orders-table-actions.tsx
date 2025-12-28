import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.tsx';
import { ArrowRight } from 'lucide-react';
import { UserReservations } from '@/features/user/types/TUserReservations.ts';

interface Props {
  row: Row<UserReservations>;
}

export function UserOrdersTableActions({ row }: Props) {
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
          <Link
            to={APP_ROUTES.sessions.getHref() + '/' + row.original.session.id}
          >
            <DropdownMenuItem>
              Voir le la session
              <DropdownMenuShortcut>
                <ArrowRight size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
