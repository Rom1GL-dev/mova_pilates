import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { useDeleteTypeCourse } from '@/features/type-course/usecases/delete-type-course/use-delete-user.tsx';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  typeCourse: TTypeCourse;
}

export function TypeCourseDeleteDialog({
  open,
  onOpenChange,
  typeCourse
}: Props) {
  const deleteMutation = useDeleteTypeCourse();

  const handleDelete = () => {
    deleteMutation.mutate(
      { id: typeCourse.id },
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
