import { usePack } from '@/features/pack/context/pack-provider.tsx';
import { PackDeleteDialog } from '@/features/pack/components/pack-delete-dialog.tsx';

export function PackDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePack();

  return (
    <div>
      {currentRow && (
        <>
          <PackDeleteDialog
            key={`type-course-delete-${currentRow?.id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setTimeout(() => setCurrentRow(null), 500);
              }
              setOpen(isOpen ? 'delete' : null);
            }}
            pack={currentRow}
          />
        </>
      )}
    </div>
  );
}
