import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TPack } from '@/features/pack/types/TPack.ts';
import { useDeletePack } from '@/features/pack/usecases/delete-pack/use-delete-user.tsx';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pack: TPack;
}

export function PackDeleteDialog({ open, onOpenChange, pack }: Props) {
  const deleteMutation = useDeletePack();

  const handleDelete = () => {
    deleteMutation.mutate(
      { id: pack.id },
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
