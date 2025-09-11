import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TUser } from '@/features/users/types/TUser.ts';
import { useDeleteUser } from '@/features/users/usecases/delete-user/use-delete-user.tsx';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: TUser;
}

export function UserDeleteDialog({ open, onOpenChange, user }: Props) {
  const deleteMutation = useDeleteUser();

  const handleDelete = () => {
    deleteMutation.mutate(
      { id: user.id },
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
          Vous êtes sur le point de supprimer un utilisateur et toutes les
          données.
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
