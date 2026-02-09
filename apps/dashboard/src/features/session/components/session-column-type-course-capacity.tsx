import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import { useListReservationsBySession } from '@/features/session/usecases/list-participant-by-session/use-list-reservations-by-session.tsx';
import { Loading } from '@/components/loading.tsx';

export function SessionColumnTypeCourseCapacity({
  typeCourseId,
  sessionId,
  customCapacity
}: {
  typeCourseId: string;
  sessionId: string;
  customCapacity?: number | null;
}) {
  const { data: typeCourseResponse, isLoading } = useListTypesCourse();

  const typeCourses = typeCourseResponse?.data ?? { typeCourse: [] };

  const typeCourse =
    typeCourses.typeCourse?.find((tc: TTypeCourse) => tc.id === typeCourseId) ??
    null;

  const { data: reservationResponse, isLoading: isLoadingReservations } =
    useListReservationsBySession(sessionId);

  const reservations = reservationResponse?.data ?? { reservations: [] };

  if (isLoading || isLoadingReservations) {
    return <Loading size={'small'} />;
  }

  // Utilise customCapacity en priorité, sinon la capacité par défaut du type de cours
  const effectiveCapacity = customCapacity ?? typeCourse.capacity;

  return (
    <>
      {reservations.reservations.length} / {effectiveCapacity}
    </>
  );
}
