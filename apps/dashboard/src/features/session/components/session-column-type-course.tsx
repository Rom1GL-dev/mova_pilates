import { Badge } from '@/components/ui/badge';
import {
  TTypeCourse,
  TypeOfCourse
} from '@/features/type-course/types/TTypeCourse.ts';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data';
import { cn } from '@/lib/utils';

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

  return (
    <>
      {typeCourse.label}
      <Badge
        className={cn(
          TYPE_COURSE_DATA[typeCourse?.typeCourse as TypeOfCourse].className,
          'rounded px-2'
        )}
      >
        {TYPE_COURSE_DATA[typeCourse.typeCourse as TypeOfCourse].label}
      </Badge>
    </>
  );
}
