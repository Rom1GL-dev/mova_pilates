'use client';

// @ts-ignore
import { Calendar, Views } from 'react-big-calendar';
import { useListSession } from '@/features/session/usecases/list-session/use-list-session';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { localizer } from '@/lib/utils';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile.ts';
import { DashboardPlanningToolbar } from '@/features/dashboard/components/dashboard-planning-toolbar.tsx';
import { useRouter } from '@/hooks/use-router.tsx';
import { APP_ROUTES } from '@/config/routes.config.tsx';

interface Session {
  id: string;
  typeCourse: {
    label: string;
    capacity: number;
  };
  startDate: string;
  endDate: string;
}

export function DashboardPlanning() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [view, setView] = useState(isMobile ? Views.DAY : Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: sessionResponse } = useListSession();
  const sessions = sessionResponse?.data?.sessions || [];

  const events = sessions.map((s: Session) => ({
    id: s.id,
    title:
      s.typeCourse.label +
      ` - ${s.typeCourse.capacity > 1 ? 'Collectif' : 'Indivuel'}`,
    start: new Date(s.startDate),
    end: new Date(s.endDate)
  }));

  const safeView = isMobile ? Views.DAY : view;

  return (
    <Calendar
      className="rbc-marie rounded-lg border"
      localizer={localizer}
      culture="fr"
      messages={{
        week: 'Semaine',
        day: 'Jour',
        today: "Aujourd'hui",
        previous: 'Précédent',
        next: 'Suivant'
      }}
      components={{
        toolbar: DashboardPlanningToolbar
      }}
      events={events}
      defaultView={safeView}
      view={safeView}
      onView={(v: string) => {
        if (!isMobile) setView(v);
      }}
      step={30}
      date={currentDate}
      onNavigate={(date: Date) => setCurrentDate(date)}
      onSelectEvent={(session: Session) => {
        router.push(APP_ROUTES.sessions.getHref() + '/' + session.id);
      }}
      timeslots={2}
      min={dayjs().hour(6).minute(0).toDate()}
      max={dayjs().hour(22).minute(0).toDate()}
      style={{ height: 650 }}
      eventPropGetter={() => ({
        style: {
          backgroundColor: '#b28053',
          color: 'white',
          borderRadius: '10px',
          padding: '8px',
          border: 'none',
          fontSize: '13px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }
      })}
    />
  );
}
