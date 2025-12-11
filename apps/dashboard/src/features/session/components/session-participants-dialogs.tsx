import { useSessionParticipants } from '@/features/session/context/session-participants-provider.tsx';
import { SessionParticipantsDeleteDialog } from '@/features/session/components/session-participants-delete-dialog.tsx';

export function SessionDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useSessionParticipants();

  return (
    <div>
      {currentRow && (
        <>
          <SessionParticipantsDeleteDialog
            key={`session-participant-delete-${currentRow?.id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setTimeout(() => setCurrentRow(null), 500);
              }
              setOpen(isOpen ? 'delete' : null);
            }}
            reservation={currentRow}
          />
        </>
      )}
    </div>
  );
}
