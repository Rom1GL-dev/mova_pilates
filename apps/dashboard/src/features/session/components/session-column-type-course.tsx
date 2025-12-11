import { Badge } from '@/components/ui/badge';
import {
  TTypeCourse,
  TypeOfCourse
} from '@/features/type-course/types/TTypeCourse.ts';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data';
import { cn } from '@/lib/utils';
import { Loading } from '@/components/loading.tsx';

export function SessionColumnTypeCourse({
  typeCourseId
}: {
  typeCourseId: string;
}) {
  const { data: typeCourseResponse, isLoading } = useListTypesCourse();
  const typeCourses = typeCourseResponse?.data ?? { typeCourse: [] };

  const typeCourse = typeCourses.typeCourse.find(
    (tc: TTypeCourse) => tc.id === typeCourseId
  );

  if (isLoading) {
    return <Loading />;
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
