import { useTypeCourse } from '@/features/type-course/context/type-course-provider.tsx';
import { TypeCourseDeleteDialog } from '@/features/type-course/components/type-course-delete-dialog.tsx';

export function TypeCourseDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTypeCourse();

  return (
    <div>
      {currentRow && (
        <>
          <TypeCourseDeleteDialog
            key={`type-course-delete-${currentRow?.id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setTimeout(() => setCurrentRow(null), 500);
              }
              setOpen(isOpen ? 'delete' : null);
            }}
            typeCourse={currentRow}
          />
        </>
      )}
    </div>
  );
}
