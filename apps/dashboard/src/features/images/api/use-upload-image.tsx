import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api.ts';

type UploadImagePayload = {
  file: File;
  category: string;
};

export function useUploadImage() {
  return useMutation({
    mutationFn: async ({ file, category }: UploadImagePayload) => {
      const formData = new FormData();
      formData.append('image', file);

      return api.post(`/v1/images/upload/${category}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
  });
}
