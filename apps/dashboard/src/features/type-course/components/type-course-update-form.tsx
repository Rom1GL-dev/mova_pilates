import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse';
import { useUpdateTypeCourse } from '@/features/type-course/usecases/update-type-course/use-update-type-course';
import { useToast } from '@/providers/toast-provider';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormImageField } from '@/features/images/components/form-image-field';
import { useUploadImage } from '@/features/images/api/use-upload-image';
import { generateImageName, renameFile } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  typeCourse: TTypeCourse;
}

export function TypeCourseUpdateForm({ typeCourse }: Props) {
  const updateTypeCourse = useUpdateTypeCourse();
  const uploadImageMutation = useUploadImage();
  const { showToast } = useToast();

  const form = useForm<TTypeCourse>({
    defaultValues: {
      id: typeCourse.id,
      label: typeCourse.label,
      capacity: typeCourse.capacity,
      description: typeCourse.description,
      image: typeCourse.image
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue('image', file, {
        shouldDirty: true,
        shouldTouch: true
      });
    }
  };

  const onSubmit = async (data: TTypeCourse) => {
    try {
      let imageToSave: string | undefined =
        typeof data.image === 'string' ? data.image : undefined;

      if (data.image instanceof File) {
        const imageName = generateImageName(data.label, data.image);
        const renamedImage = renameFile(data.image, imageName);

        await uploadImageMutation.mutateAsync({
          file: renamedImage,
          category: 'typeCourse'
        });

        imageToSave = imageName;
      }

      const payload = {
        id: data.id,
        label: data.label,
        capacity: data.capacity,
        description: data.description,
        image: imageToSave
      };

      const response = await updateTypeCourse.mutateAsync(
        payload as TTypeCourse
      );

      if (response) {
        showToast({
          type: 'success',
          message: 'Type de cours modifié avec succès'
        });
      } else {
        showToast({
          type: 'error',
          message:
            "Une erreur s'est produite lors de la modification du type de cours"
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        message:
          "Une erreur s'est produite lors de la modification du type de cours (upload image)."
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeCourse) {
      form.reset({
        id: typeCourse.id,
        label: typeCourse.label,
        capacity: typeCourse.capacity,
        description: typeCourse.description,
        image: typeCourse.image
      });
    }
  }, [typeCourse, form]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-md"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormImageField
                  category="typeCourse"
                  name="image"
                  required={false}
                  image={field.value ?? ''}
                  onImageChange={handleImageChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du type de cours</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nom du type de cours" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacité de personne</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Capacité de personne" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <Textarea {...field} placeholder={'Mettre une description'} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-6 cursor-pointer bg-[#b28053] text-white hover:bg-[#8b6f55]"
          >
            Enregistrer
          </Button>
        </form>
      </Form>
    </div>
  );
}
