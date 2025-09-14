import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteUserDto } from '@/features/user/usecases/delete-user/delete-user.dto.ts';
import { typeCourseService } from '@/features/type-course/usecases/type-course.service.ts';

export const useDeleteTypeCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['type-course'],
    mutationFn: async (payload: DeleteUserDto) =>
      typeCourseService.deleteTypeCourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['type-course'] });
    }
  });
};
