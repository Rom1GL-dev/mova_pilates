import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx';
import { TSession } from '@/features/session/types/TSession.ts';
import { useUpdateSession } from '@/features/session/usecases/update-session/use-update-session.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/providers/toast-provider.tsx';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '@/components/loading.tsx';

interface Props {
  session: TSession;
}

interface SessionFormValues {
  id?: string;
  startDate: string;
  endDate: string;
  typeCourseId: string;
}

export function SessionUpdateForm({ session }: Props) {
  const updatePack = useUpdateSession();
  const { data: typeCourseResponse, isLoading } = useListTypesCourse();
  const typesCourse = typeCourseResponse?.data?.typeCourse ?? [];

  const { showToast } = useToast();

  const form = useForm<SessionFormValues>({
    defaultValues: {
      id: session?.id,
      startDate: session
        ? dayjs(session.startDate).format('YYYY-MM-DDTHH:mm')
        : '',
      endDate: session ? dayjs(session.endDate).format('YYYY-MM-DDTHH:mm') : '',
      typeCourseId: session ? String(session.typeCourseId) : ''
    }
  });

  useEffect(() => {
    if (session && typesCourse.length > 0) {
      form.reset({
        id: session.id,
        startDate: dayjs(session.startDate).format('YYYY-MM-DDTHH:mm'),
        endDate: dayjs(session.endDate).format('YYYY-MM-DDTHH:mm'),
        typeCourseId: String(session.typeCourseId)
      });
    }
  }, [session, typesCourse.length, form]);

  const onSubmit = async (data: SessionFormValues) => {
    const response = await updatePack.mutateAsync({
      ...data,
      typeCourseId: String(data.typeCourseId),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
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

  if (isLoading || !session) {
    return <Loading />;
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
            name="startDate"
            render={({ field }) => {
              const fallback = dayjs(session.startDate).format(
                'YYYY-MM-DDTHH:mm'
              );
              return (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value ?? fallback}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => {
              const fallback = dayjs(session.endDate).format(
                'YYYY-MM-DDTHH:mm'
              );
              return (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value ?? fallback}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="typeCourseId"
            render={({ field }) => {
              const fallback = String(session.typeCourseId);
              return (
                <FormItem>
                  <FormLabel>Type de cours</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => field.onChange(val)}
                      value={field.value ?? fallback}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typesCourse.map((type: TTypeCourse) => (
                          <SelectItem key={type.id} value={String(type.id)}>
                            {type.label}
                            <Badge
                              className={cn(
                                TYPE_COURSE_DATA[type.typeCourse].className,
                                'rounded px-2'
                              )}
                            >
                              {TYPE_COURSE_DATA[type.typeCourse].label}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            type="submit"
            className="bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white"
          >
            Enregistrer
          </Button>
        </form>
      </Form>
    </div>
  );
}
