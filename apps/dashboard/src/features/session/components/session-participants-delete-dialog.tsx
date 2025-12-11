import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useDeleteParticipant } from '@/features/session/usecases/delete-participant/use-delete-participant.tsx';
import { TSessionParticipants } from '@/features/session/types/TSessionParticipants.ts';
import { useToast } from '@/providers/toast-provider.tsx';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: TSessionParticipants;
}

export function SessionParticipantsDeleteDialog({
  open,
  onOpenChange,
  reservation
}: Props) {
  const { showToast } = useToast();
  const deleteMutation = useDeleteParticipant();
  const handleDelete = async () => {
    const response = await deleteMutation.mutateAsync({
      id: reservation.reservationId
    });

    if (response) {
      showToast({
        type: 'success',
        message: 'Réservation supprimé avec succès'
      });
      onOpenChange(false);
    } else {
      showToast({
        type: 'error',
        message:
          "Une erreur s'est produite lors de la suppression de la réservation"
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Êtes-vous sûr ?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-slate-600">
          Vous êtes sur le point de supprimer {reservation.firstname}{' '}
          {reservation.lastname} de cette session.
        </p>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleDelete();
              onOpenChange(false);
            }}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
