import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { TypeCourseUpdateForm } from '@/features/type-course/components/type-course-update-form.tsx';

interface Props {
  typeCourse: TTypeCourse;
}

export function TypeCourseTabInformation({ typeCourse }: Props) {
  return (
    <div className={'grid gap-x-10 lg:grid-cols-2'}>
      <TypeCourseUpdateForm typeCourse={typeCourse} />
    </div>
  );
}
