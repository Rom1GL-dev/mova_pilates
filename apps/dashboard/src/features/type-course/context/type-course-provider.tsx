import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';

type TypeCourseDialogType = 'edit' | 'delete';

interface TypeCourseContextType {
  open: TypeCourseDialogType | null;
  setOpen: (str: TypeCourseDialogType | null) => void;
  currentRow: TTypeCourse | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TTypeCourse | null>>;
}

const TypeCourseContext = React.createContext<TypeCourseContextType | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export default function TypeCourseProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TypeCourseDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TTypeCourse | null>(null);

  return (
    <TypeCourseContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </TypeCourseContext.Provider>
  );
}

export const useTypeCourse = () => {
  const announcesContext = React.useContext(TypeCourseContext);

  if (!announcesContext) {
    throw new Error('useTypeCourse has to be used within <TypeCourseContext>');
  }

  return announcesContext;
};
