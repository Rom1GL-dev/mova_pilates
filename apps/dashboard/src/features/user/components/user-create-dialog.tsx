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
import { useCreateUser } from '@/features/user/usecases/create-user/use-create-user.tsx';
import {
  CreateUserDto,
  CreateUserForm
} from '@/features/user/usecases/create-user/create-user.dto.ts';
import dayjs from 'dayjs';

export function UserCreateDialog() {
  const [open, setOpen] = useState(false);

  const createMutation = useCreateUser();

  const [formData, setFormData] = useState<CreateUserForm>({
    firstname: '',
    lastname: '',
    email: '',
    tel: '',
    dob: new Date(),
    role: 'USER',
    password: 'test'
  });

  const handleInputChange = (
    field: keyof CreateUserDto,
    value: string | Date
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await createMutation.mutateAsync(formData);
      setOpen(false);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        tel: '',
        dob: new Date(),
        role: 'USER',
        password: 'test'
      });
    } catch (error) {
      console.error('Erreur lors de la création du  :', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2 bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white">
          <PlusIcon className="h-4 w-4" /> Ajouter un utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">Prénom</Label>
            <Input
              id="firstname"
              value={formData.firstname}
              onChange={(e) => handleInputChange('firstname', e.target.value)}
              placeholder="Loic"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Nom de famille</Label>
            <Input
              id="lastname"
              value={formData.lastname}
              onChange={(e) => handleInputChange('lastname', e.target.value)}
              placeholder="Chevigny"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dob">Date de naissance</Label>
            <Input
              id="dob"
              type="date"
              value={dayjs(formData.dob).format('YYYY-MM-DD')}
              onChange={(e) => handleInputChange('dob', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type={'email'}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="loic.chevigny@gmail.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tel">Numéro de téléphone</Label>
            <Input
              id="tel"
              value={formData.tel}
              onChange={(e) => handleInputChange('tel', e.target.value)}
              placeholder="06 XX XX XX XX"
            />
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
