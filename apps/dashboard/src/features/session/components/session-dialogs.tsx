import { SessionDeleteDialog } from '@/features/session/components/session-delete-dialog.tsx';
import { useSession } from '@/features/session/context/session-provider.tsx';

export function SessionDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useSession();

  return (
    <div>
      {currentRow && (
        <>
          <SessionDeleteDialog
            key={`session-delete-${currentRow?.id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setTimeout(() => setCurrentRow(null), 500);
              }
              setOpen(isOpen ? 'delete' : null);
            }}
            session={currentRow}
          />
        </>
      )}
    </div>
  );
}
