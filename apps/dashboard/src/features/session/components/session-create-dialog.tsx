'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { useToast } from '@/providers/toast-provider.tsx';
import { useForm } from 'react-hook-form';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import { TSession } from '@/features/session/types/TSession.ts';
import { useCreateSession } from '@/features/session/usecases/create-session/use-create-session.tsx';

export function SessionCreateDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateSession();
  const { showToast } = useToast();
  const { data: typeCourseResponse, isLoading } = useListTypesCourse();
  const { data: typesCourse } = typeCourseResponse ?? {
    data: []
  };

  const form = useForm<TSession>();

  const handleSave = async (data: TSession) => {
    try {
      const payload: TSession = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      };

      const response = await createMutation.mutateAsync(payload);
      if (response) {
        showToast({
          type: 'success',
          message: 'Session créé avec succès'
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
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2 bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white">
          <PlusIcon className="h-4 w-4" /> Ajouter une session
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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Input
                      type={'datetime-local'}
                      {...field}
                      value={field.value ? String(field.value) : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Input
                      type={'datetime-local'}
                      {...field}
                      value={field.value ? String(field.value) : ''}
                    />
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
