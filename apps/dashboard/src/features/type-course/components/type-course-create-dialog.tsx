'use client';

import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  CreateTypeCourseDto,
  CreateTypeCourseForm
} from '@/features/type-course/usecases/create-type-course/create-type-course.dto.ts';
import { useCreateTypeCourse } from '@/features/type-course/usecases/create-type-course/use-create-type-course.tsx';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea.tsx';
import { FormImageField } from '@/features/images/components/form-image-field';
import { useUploadImage } from '@/features/images/api/use-upload-image';
import { generateImageName, renameFile } from '@/lib/utils';

export function TypeCourseCreateDialog() {
  const [open, setOpen] = useState(false);

  const createMutation = useCreateTypeCourse();
  const uploadImageMutation = useUploadImage();

  const [formData, setFormData] = useState<CreateTypeCourseForm>({
    label: '',
    capacity: 0,
    description: '',
    image: ''
  });

  const handleInputChange = (
    field: keyof CreateTypeCourseDto,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSave = async () => {
    try {
      let imageToSave: string | undefined = undefined;

      if (formData.image instanceof File) {
        const imageName = generateImageName(formData.label, formData.image);
        const renamedImage = renameFile(formData.image, imageName);

        await uploadImageMutation.mutateAsync({
          file: renamedImage,
          category: 'typeCourse'
        });

        imageToSave = imageName;
      }

      const payload: CreateTypeCourseForm = {
        label: formData.label,
        capacity: Number(formData.capacity),
        description: formData.description,
        image: imageToSave
      };

      await createMutation.mutateAsync(payload);

      setOpen(false);
      setFormData({
        label: '',
        capacity: 0,
        description: '',
        image: ''
      });
    } catch (error) {
      console.error('Erreur lors de la création du type de cours :', error);
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
              placeholder="Ex: Pilates"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="capacity">Capacité</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                handleInputChange('capacity', Number(e.target.value))
              }
              placeholder="0"
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description du type de cours"
            />
          </div>

          <div className="grid gap-2">
            <FormImageField
              category="typeCourse"
              name="image"
              required={true}
              image={formData.image ?? ''}
              onImageChange={handleImageChange}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fermer
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white"
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
