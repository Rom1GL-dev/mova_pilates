import { useUser } from '@/features/user/context/user-provider.tsx';
import { UserDeleteDialog } from '@/features/user/components/user-delete-dialog.tsx';

export function UserDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUser();

  return (
    <div>
      {currentRow && (
        <>
          <UserDeleteDialog
            key={`user-delete-${currentRow?.id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setTimeout(() => setCurrentRow(null), 500);
              }
              setOpen(isOpen ? 'delete' : null);
            }}
            user={currentRow}
          />
        </>
      )}
    </div>
  );
}
