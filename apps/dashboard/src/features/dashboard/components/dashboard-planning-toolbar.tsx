'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useIsMobile } from '@/hooks/use-mobile.ts';

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
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate('TODAY')}
          className="cursor-pointer rounded-md bg-[#f3e8de] px-3 py-1.5 text-sm font-medium text-[#b28053]"
        >
          Aujourd'hui
        </button>

        <button
          onClick={() => onNavigate('PREV')}
          className="cursor-pointer rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
        >
          Précédent
        </button>

        <button
          onClick={() => onNavigate('NEXT')}
          className="cursor-pointer rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
        >
          Suivant
        </button>
      </div>

      {!isMobile && (
        <div className="text-lg font-semibold text-gray-800">{label}</div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => onView('week')}
          className={
            'cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium ' +
            (view === 'week'
              ? 'bg-[#b28053] text-white'
              : 'bg-gray-100 text-gray-700')
          }
        >
          Semaine
        </button>
        <button
          onClick={() => onView('day')}
          className={
            'cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium ' +
            (view === 'day'
              ? 'bg-[#b28053] text-white'
              : 'bg-gray-100 text-gray-700')
          }
        >
          Jour
        </button>
      </div>
    </div>
  );
}
