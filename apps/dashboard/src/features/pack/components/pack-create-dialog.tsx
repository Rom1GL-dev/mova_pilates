'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog.tsx';
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
import { TPack } from '@/features/pack/types/TPack.ts';
import { useCreatePack } from '@/features/pack/usecases/create-pack/use-create-pack.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/providers/toast-provider.tsx';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '@/components/loading.tsx';

export function PackCreateDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreatePack();
  const { showToast } = useToast();
  const { data: typeCourseResponse, isLoading } = useListTypesCourse();
  const { data: typesCourse } = typeCourseResponse ?? {
    data: []
  };

  const form = useForm<TPack>();

  const handleSave = async (data: TPack) => {
    try {
      const response = await createMutation.mutateAsync(data);
      if (response) {
        showToast({
          type: 'success',
          message: 'Pack créé avec succès'
        });
        setOpen(false);
      } else {
        showToast({
          type: 'error',
          message: "Une erreur s'est produite lors de la création du pack"
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création du  :', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2 bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white">
          <PlusIcon className="h-4 w-4" /> Ajouter un pack
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="space-y-4 rounded-md"
          >
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau type de cours</DialogTitle>
            </DialogHeader>

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
                      type={'number'}
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
                    <Input type={'number'} {...field} placeholder="Prix" />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typesCourse?.typeCourse.map((type: TTypeCourse) => (
                          <SelectItem key={type.id} value={type.id}>
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
              )}
            />
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Fermer
              </Button>
              <Button
                type={'submit'}
                className={
                  'bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white'
                }
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
