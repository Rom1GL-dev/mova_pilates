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
import { useUpdatePack } from '@/features/pack/usecases/update-pack/use-update-pack.tsx';
import { TPack } from '@/features/pack/types/TPack.ts';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { useEffect } from 'react';

interface Props {
  pack: TPack;
}

interface PackFormValues {
  id?: string;
  label: string;
  nbCourse: number;
  price: number;
  typeCourseId: string;
}

export function PackUpdateForm({ pack }: Props) {
  const updatePack = useUpdatePack();
  const { data: typeCourseResponse, isLoading } = useListTypesCourse();
  const typesCourse = typeCourseResponse?.data?.typeCourse ?? [];

  const { showToast } = useToast();

  const form = useForm<PackFormValues>({
    defaultValues: {
      id: pack?.id,
      label: pack?.label ?? '',
      nbCourse: pack?.nbCourse ?? 0,
      price: pack?.price ?? 0,
      typeCourseId: pack ? String(pack.typeCourseId) : ''
    }
  });

  useEffect(() => {
    if (pack && typesCourse.length > 0) {
      form.reset({
        id: pack.id,
        label: pack.label,
        nbCourse: pack.nbCourse,
        price: pack.price,
        typeCourseId: String(pack.typeCourseId)
      });
    }
  }, [pack, typesCourse.length, form]);

  const onSubmit = async (data: PackFormValues) => {
    const response = await updatePack.mutateAsync({
      ...data,
      typeCourseId: String(data.typeCourseId)
    });

    if (response) {
      showToast({ type: 'success', message: 'Pack modifié avec succès' });
    } else {
      showToast({
        type: 'error',
        message:
          "Une erreur s'est produite lors de la modification du type de cours"
      });
    }
  };

  if (isLoading || !pack) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  }

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
                <FormLabel>Nom du pack</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nom du pack" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nbCourse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de cours</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Nombre de cours"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Prix" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeCourseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de cours</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typesCourse.map((type: TTypeCourse) => (
                        <SelectItem key={type.id} value={String(type.id)}>
                          {type.label}
                        </SelectItem>
                      ))}
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
