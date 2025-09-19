import { useGetPacksByTypeCourse } from '@/features/type-course/usecases/get-packs-by-type-course/use-get-packs-by-type-course.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';

interface Props {
  typeCourse: TTypeCourse;
}

export function TypeCoursePacks({ typeCourse }: Props) {
  const { data: packResponse, isLoading } = useGetPacksByTypeCourse(
    typeCourse.id
  );
  const packData = packResponse?.data.packs;

  if (isLoading || !packData) {
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

  return <div>TypeCoursePacks</div>;
}
