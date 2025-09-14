import { useMutation, useQueryClient } from '@tanstack/react-query';
import { typeCourseService } from '@/features/type-course/usecases/type-course.service.ts';
import { UpdateTypeCourseForm } from '@/features/type-course/usecases/update-type-course/update-type-course.dto.ts';

export const useUpdateTypeCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['type-course'],
    mutationFn: async (payload: UpdateTypeCourseForm) =>
      typeCourseService.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['type-course'] });
    }
  });
};
