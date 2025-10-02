import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';

export function SessionColumnTypeCourse({
  typeCourseId
}: {
  typeCourseId: string;
}) {
  const { data: typeCourseResponse, isLoading } = useListTypesCourse();
  const typeCourses = typeCourseResponse?.data ?? [];

  const typeCourse = typeCourses.typeCourse.find(
    (tc: TTypeCourse) => tc.id === typeCourseId
  );

  if (isLoading) {
    return (
      <div className={'flex min-h-screen w-full items-center justify-center'}>
        <div
          className={
            'border-primary h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-transparent'
          }
        ></div>
      </div>
    );
  }

  return <>{typeCourse.label}</>;
}
