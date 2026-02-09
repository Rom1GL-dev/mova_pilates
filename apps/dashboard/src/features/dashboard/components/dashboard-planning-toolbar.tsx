'use client';

import { useIsMobile } from '@/hooks/use-mobile.ts';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

type DashboardPlanningToolbarProps = {
  label: string;
  view: string;
  onNavigate: (action: any) => void;
  onView: (view: string) => void;
};

export function DashboardPlanningToolbar(props: DashboardPlanningToolbarProps) {
  const { label, onNavigate, onView, view } = props;
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3">
      {isMobile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Action
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            <DropdownMenuItem onClick={() => onNavigate('TODAY')}>
              Aujourd'hui
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('PREV')}>
              Précédent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('NEXT')}>
              Suivant
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onView('week')}>
              Vue semaine {view === 'week' && '✓'}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onView('day')}>
              Vue jour {view === 'day' && '✓'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!isMobile && (
        <>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onNavigate('TODAY')}
              className="bg-[#f3e8de] text-[#b28053] hover:bg-[#C9B9A9]"
            >
              Aujourd'hui
            </Button>

            <Button variant="outline" onClick={() => onNavigate('PREV')}>
              Précédent
            </Button>

            <Button variant="outline" onClick={() => onNavigate('NEXT')}>
              Suivant
            </Button>
          </div>

          <div className="text-lg font-semibold text-gray-800">{label}</div>

          <div className="flex items-center gap-2">
            <Button
              className="bg-[#f3e8de] text-[#b28053] hover:bg-[#C9B9A9]"
              onClick={() => onView('week')}
            >
              Semaine
            </Button>

            <Button
              className="bg-[#f3e8de] text-[#b28053] hover:bg-[#C9B9A9]"
              onClick={() => onView('day')}
            >
              Jour
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
