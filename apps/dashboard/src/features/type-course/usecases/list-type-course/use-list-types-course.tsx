import { useQuery } from '@tanstack/react-query';
import { typeCourseService } from '@/features/type-course/usecases/type-course.service.ts';

export const useListTypesCourse = () => {
  return useQuery({
    queryKey: ['type-course'],
    queryFn: async () => typeCourseService.listTypesCourse()
  });
};
