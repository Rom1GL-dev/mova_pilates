import { useMutation, useQueryClient } from '@tanstack/react-query';
import { typeCourseService } from '@/features/type-course/usecases/type-course.service.ts';
import { CreateTypeCourseForm } from '@/features/type-course/usecases/create-type-course/create-type-course.dto.ts';

export const useCreateTypeCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['type-course'],
    mutationFn: async (payload: CreateTypeCourseForm) =>
      typeCourseService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['type-course'] });
    }
  });
};
