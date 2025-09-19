import { useQuery } from '@tanstack/react-query';
import { typeCourseService } from '@/features/type-course/usecases/type-course.service.ts';

export const useGetPacksByTypeCourse = (id: string) => {
  return useQuery({
    queryKey: ['pack'],
    queryFn: async () => typeCourseService.getPacksByTypeCourseId(id)
  });
};
