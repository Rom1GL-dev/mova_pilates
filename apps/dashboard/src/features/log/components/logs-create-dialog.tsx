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
import { Label } from '@/components/ui/label.tsx';
import { PlusIcon } from '@radix-ui/react-icons';
import { useCreateTypeCourse } from '@/features/type-course/usecases/create-type-course/use-create-type-course.tsx';
import {
  CreateTypeCourseDto,
  CreateTypeCourseForm
} from '@/features/type-course/usecases/create-type-course/create-type-course.dto.ts';
import { TypeOfCourse } from '@/features/type-course/types/TTypeCourse.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx';

export function TypeCourseCreateDialog() {
  const [open, setOpen] = useState(false);

  const createMutation = useCreateTypeCourse();

  const [formData, setFormData] = useState<CreateTypeCourseForm>({
    label: '',
    capacity: 0,
    typeCourse: 'INDIVIDUAL' as TypeOfCourse
  });

  const handleInputChange = (
    field: keyof CreateTypeCourseDto,
    value: string | Date
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await createMutation.mutateAsync(formData);
      setOpen(false);
      setFormData({
        label: '',
        capacity: 0,
        typeCourse: 'INDIVIDUAL' as TypeOfCourse
      });
    } catch (error) {
      console.error('Erreur lors de la création du  :', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2 bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white">
          <PlusIcon className="h-4 w-4" /> Ajouter un type de cours
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau type de cours</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="label">Nom du type de cours</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => handleInputChange('label', e.target.value)}
              placeholder="Loic"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="capacity">Capacité</Label>
            <Input
              id="capacity"
              type={'number'}
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="capacity">Type de cours</Label>
            <Select onValueChange={(e) => handleInputChange('typeCourse', e)}>
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
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fermer
          </Button>
          <Button
            onClick={handleSave}
            className={
              'bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white'
            }
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
