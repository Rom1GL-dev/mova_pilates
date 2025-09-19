import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { useForm } from 'react-hook-form';
import {
  TTypeCourse,
  TypeOfCourse
} from '@/features/type-course/types/TTypeCourse.ts';
import { useUpdateTypeCourse } from '@/features/type-course/usecases/update-type-course/use-update-type-course.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx';
import { useEffect } from 'react';

interface Props {
  typeCourse: TTypeCourse;
}

export function TypeCourseUpdateForm({ typeCourse }: Props) {
  const updateTypeCourse = useUpdateTypeCourse();
  const { showToast } = useToast();
  const form = useForm<TTypeCourse>({
    defaultValues: {
      id: typeCourse.id,
      label: typeCourse.label,
      capacity: typeCourse.capacity,
      typeCourse: typeCourse.typeCourse
    }
  });

  const onSubmit = async (data: TTypeCourse) => {
    const response = await updateTypeCourse.mutateAsync(data);
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
  };

  useEffect(() => {
    if (typeCourse) {
      form.reset({
        id: typeCourse.id,
        label: typeCourse.label,
        capacity: typeCourse.capacity,
        typeCourse: typeCourse.typeCourse
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
            name="typeCourse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de cours</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TypeOfCourse.INDIVUDUAL}>
                        Individuel
                      </SelectItem>
                      <SelectItem value={TypeOfCourse.COLLECTIVE}>
                        Collectif
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
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
