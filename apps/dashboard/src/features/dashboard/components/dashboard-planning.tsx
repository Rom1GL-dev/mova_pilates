'use client';

import { useListSession } from '@/features/session/usecases/list-session/use-list-session';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile.ts';
import { DashboardPlanningToolbar } from '@/features/dashboard/components/dashboard-planning-toolbar.tsx';
import { useRouter } from '@/hooks/use-router.tsx';
import { APP_ROUTES } from '@/config/routes.config.tsx';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Session {
  id: string;
  typeCourse: {
    label: string;
    capacity: number;
  };
  startDate: string;
  endDate: string;
}

type ViewType = 'week' | 'day';

export function DashboardPlanning() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [view, setView] = useState<ViewType>(isMobile ? 'day' : 'week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: sessionResponse } = useListSession();
  const sessions = sessionResponse?.data?.sessions || [];

  // Generate time slots (6h-22h)
  const timeSlots = Array.from({ length: 16 }, (_, i) => i + 6);

  // Get days to display
  const getDaysToDisplay = () => {
    if (view === 'day') {
      return [currentDate];
    }
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Lundi
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const daysToDisplay = getDaysToDisplay();

  // Get sessions for a specific day and time
  const getSessionsForSlot = (day: Date, hour: number) => {
    return sessions.filter((session: Session) => {
      const sessionStart = new Date(session.startDate);
      const sessionHour = sessionStart.getHours();
      const sessionMinutes = sessionStart.getMinutes();

      return (
        isSameDay(sessionStart, day) &&
        sessionHour === hour &&
        sessionMinutes === 0
      );
    });
  };

  // Navigation handlers
  const handleNavigate = (action: string) => {
    if (action === 'TODAY') {
      setCurrentDate(new Date());
    } else if (action === 'PREV') {
      setCurrentDate(
        view === 'day'
          ? addDays(currentDate, -1)
          : addDays(currentDate, -7)
      );
    } else if (action === 'NEXT') {
      setCurrentDate(
        view === 'day'
          ? addDays(currentDate, 1)
          : addDays(currentDate, 7)
      );
    }
  };

  const handleViewChange = (newView: string) => {
    if (!isMobile) {
      setView(newView as ViewType);
    }
  };

  // Format label for toolbar
  const getLabel = () => {
    if (view === 'day') {
      return format(currentDate, 'EEEE d MMMM yyyy', { locale: fr });
    }
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    return `${format(start, 'd MMM', { locale: fr })} - ${format(end, 'd MMM yyyy', { locale: fr })}`;
  };

  // Calculate session position and height
  const getSessionStyle = (session: Session) => {
    const start = new Date(session.startDate);
    const end = new Date(session.endDate);
    const minutes = start.getMinutes();
    const duration = (end.getTime() - start.getTime()) / (1000 * 60); // minutes

    return {
      top: `${(minutes / 60) * 100}%`,
      height: `${(duration / 60) * 100}%`,
    };
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <DashboardPlanningToolbar
        label={getLabel()}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
      />

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header with days */}
          <div className="grid border-b bg-gray-50" style={{ gridTemplateColumns: `60px repeat(${daysToDisplay.length}, 1fr)` }}>
            <div className="border-r p-2"></div>
            {daysToDisplay.map((day, idx) => (
              <div
                key={idx}
                className={cn(
                  'border-r p-2 text-center font-medium',
                  isSameDay(day, new Date()) && 'bg-[#f3e8de] text-[#b28053]'
                )}
              >
                <div className="text-xs uppercase text-gray-500">
                  {format(day, 'EEE', { locale: fr })}
                </div>
                <div className={cn(
                  'text-lg font-semibold',
                  isSameDay(day, new Date()) && 'text-[#b28053]'
                )}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots grid */}
          <div className="relative" style={{ height: '650px' }}>
            {timeSlots.map((hour) => (
              <div
                key={hour}
                className="grid border-b"
                style={{
                  gridTemplateColumns: `60px repeat(${daysToDisplay.length}, 1fr)`,
                  height: `${100 / timeSlots.length}%`,
                }}
              >
                {/* Time label */}
                <div className="border-r p-2 text-xs text-gray-500 font-medium">
                  {`${hour}:00`}
                </div>

                {/* Day columns */}
                {daysToDisplay.map((day, dayIdx) => {
                  const sessionsInSlot = getSessionsForSlot(day, hour);

                  return (
                    <div
                      key={dayIdx}
                      className={cn(
                        'border-r relative',
                        isSameDay(day, new Date()) && 'bg-[#fef9f5]'
                      )}
                    >
                      {/* Half-hour line */}
                      <div className="absolute top-1/2 left-0 right-0 border-t border-gray-100" />

                      {/* Sessions */}
                      {sessionsInSlot.map((session: Session) => {
                        const style = getSessionStyle(session);
                        return (
                          <div
                            key={session.id}
                            className="absolute left-1 right-1 bg-[#b28053] text-white rounded-lg p-2 cursor-pointer hover:bg-[#9a6d47] transition-colors shadow-md overflow-hidden"
                            style={style}
                            onClick={() => {
                              router.push(
                                APP_ROUTES.sessions.getHref() + '/' + session.id
                              );
                            }}
                          >
                            <div className="text-xs font-semibold truncate">
                              {session.typeCourse.label}
                            </div>
                            <div className="text-[10px] opacity-90">
                              {session.typeCourse.capacity > 1
                                ? 'Collectif'
                                : 'Individuel'}
                            </div>
                            <div className="text-[10px] opacity-75">
                              {format(new Date(session.startDate), 'HH:mm', { locale: fr })} -{' '}
                              {format(new Date(session.endDate), 'HH:mm', { locale: fr })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
