import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useDeleteSession } from '@/features/session/usecases/delete-session/use-delete-session.tsx';
import { TSession } from '@/features/session/types/TSession.ts';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: TSession;
}

export function SessionDeleteDialog({ open, onOpenChange, session }: Props) {
  const deleteMutation = useDeleteSession();
  const handleDelete = () => {
    deleteMutation.mutate(
      { id: session.id },
      {
        onSuccess: () => {
          onOpenChange(false);
        }
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Êtes-vous sûr ?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-slate-600">
          Vous êtes sur le point de supprimer un pack et toutes les données.
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
