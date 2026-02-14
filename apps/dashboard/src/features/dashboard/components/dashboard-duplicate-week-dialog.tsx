'use client';

import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useDuplicateWeek } from '@/features/session/usecases/duplicate-week/use-duplicate-week.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { useState } from 'react';
import { format, startOfWeek, setWeek, startOfYear } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DuplicateWeekDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Helper function to parse week input format (YYYY-Www) to Date
const parseWeekInput = (weekString: string): Date => {
  // Format is "2024-W07"
  const [yearStr, weekStr] = weekString.split('-W');
  const year = parseInt(yearStr, 10);
  const week = parseInt(weekStr, 10);

  // Start with January 1st of the given year
  const date = startOfYear(new Date(year, 0, 1));

  // Set the week number (ISO week)
  return setWeek(date, week, { weekStartsOn: 1, firstWeekContainsDate: 4 });
};

export function DuplicateWeekDialog({
  open,
  onOpenChange,
}: DuplicateWeekDialogProps) {
  const [sourceWeek, setSourceWeek] = useState('');
  const [destinationWeek, setDestinationWeek] = useState('');
  const { showToast } = useToast();
  const duplicateMutation = useDuplicateWeek();

  const handleDuplicate = async () => {
    if (!sourceWeek || !destinationWeek) {
      showToast({
        type: 'error',
        message: 'Veuillez sélectionner les deux semaines',
      });
      return;
    }

    try {
      // Convert week input (YYYY-Www) to Date
      const sourceDate = parseWeekInput(sourceWeek);
      const destinationDate = parseWeekInput(destinationWeek);

      const result: any = await duplicateMutation.mutateAsync({
        sourceWeekStart: startOfWeek(sourceDate, { weekStartsOn: 1 }),
        destinationWeekStart: startOfWeek(destinationDate, { weekStartsOn: 1 }),
      });

      if (result) {
        const message = result?.data?.message || `${result?.data?.count || 0} sessions dupliquées avec succès`;
        showToast({
          type: 'success',
          message,
        });
        onOpenChange(false);
        setSourceWeek('');
        setDestinationWeek('');
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: "Une erreur s'est produite lors de la duplication",
      });
    }
  };

  const getWeekLabel = (weekString: string) => {
    if (!weekString) return '';
    try {
      const date = parseWeekInput(weekString);
      return format(startOfWeek(date, { weekStartsOn: 1 }), 'EEEE d MMMM yyyy', {
        locale: fr,
      });
    } catch (error) {
      return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Dupliquer une semaine</DialogTitle>
          <DialogDescription>
            Copiez toutes les sessions d'une semaine vers une autre semaine
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="source-week" className="text-sm font-medium">
              Semaine source
            </label>
            <Input
              id="source-week"
              type="week"
              value={sourceWeek}
              onChange={(e) => setSourceWeek(e.target.value)}
            />
            {sourceWeek && (
              <p className="text-xs text-gray-500">
                Semaine du {getWeekLabel(sourceWeek)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="destination-week" className="text-sm font-medium">
              Semaine destination
            </label>
            <Input
              id="destination-week"
              type="week"
              value={destinationWeek}
              onChange={(e) => setDestinationWeek(e.target.value)}
            />
            {destinationWeek && (
              <p className="text-xs text-gray-500">
                Semaine du {getWeekLabel(destinationWeek)}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setSourceWeek('');
              setDestinationWeek('');
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleDuplicate}
            disabled={!sourceWeek || !destinationWeek || duplicateMutation.isPending}
            className="bg-[#b28053] text-white hover:bg-[#8b6f55] hover:text-white"
          >
            {duplicateMutation.isPending ? 'Duplication...' : 'Dupliquer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
