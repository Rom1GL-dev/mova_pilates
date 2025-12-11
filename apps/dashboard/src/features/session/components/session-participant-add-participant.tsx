'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CaretSortIcon, CheckIcon, PlusIcon } from '@radix-ui/react-icons';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';

import { cn } from '@/lib/utils';

import { AddParticipantDto } from '@/features/session/usecases/add-participant/add-participant.dto';
import { useListUsers } from '@/features/user/usecases/list-users/use-list-users';
import { useAddParticipant } from '@/features/session/usecases/add-participant/use-add-participant.tsx';
import { useListReservationsBySession } from '@/features/session/usecases/list-participant-by-session/use-list-reservations-by-session.tsx';
import { useToast } from '@/providers/toast-provider.tsx';

interface Props {
  sessionId: string;
  disabled?: boolean;
}

export function SessionParticipantAddParticipant({
  sessionId,
  disabled
}: Props) {
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const createMutation = useAddParticipant();

  const [formData, setFormData] = useState<AddParticipantDto>({
    userId: '',
    sessionId: sessionId
  });

  const { showToast } = useToast();

  const { data: usersResponse } = useListUsers();
  const users = usersResponse?.data?.users ?? [];

  const { data: reservationResponse } = useListReservationsBySession(sessionId);
  const reservations = reservationResponse?.data?.reservations ?? [];

  const reservedUserIds = reservations.map((r: any) => r.id);

  const availableUsers = users.filter(
    (u: any) => !reservedUserIds.includes(u.id)
  );

  const selectedUser = users.find((u: any) => u.id === formData.userId);

  const handleSave = async () => {
    try {
      const response = await createMutation.mutateAsync(formData);
      if (response) {
        showToast({
          type: 'success',
          message: 'Réservation créé avec succès'
        });
        setOpen(false);
      } else {
        showToast({
          type: 'error',
          message:
            "Une erreur s'est produite lors de la création de la réservation"
        });
      }

      setFormData({ userId: '', sessionId });
    } catch (error) {
      console.error('Erreur lors de la création :', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="flex cursor-pointer items-center gap-2 bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white"
        >
          <PlusIcon className="h-4 w-4" /> Ajouter un participant
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un participant à la session</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label>Participant</Label>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {selectedUser
                    ? `${selectedUser.firstname} ${selectedUser.lastname}`
                    : 'Rechercher un participant...'}
                  <CaretSortIcon className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Rechercher..." />

                  <CommandList>
                    <CommandEmpty>Aucun utilisateur disponible.</CommandEmpty>

                    <CommandGroup>
                      {availableUsers.map((user: any) => (
                        <CommandItem
                          key={user.id}
                          onSelect={() => {
                            setFormData({
                              userId: user.id,
                              sessionId: sessionId
                            });
                            setPopoverOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              user.id === formData.userId
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {user.firstname} {user.lastname} ({user.email})
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
