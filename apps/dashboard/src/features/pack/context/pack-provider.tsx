import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state.tsx';
import { TPack } from '@/features/pack/types/TPack.ts';

type PackDialogType = 'edit' | 'delete';

interface PackContextType {
  open: PackDialogType | null;
  setOpen: (str: PackDialogType | null) => void;
  currentRow: TPack | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TPack | null>>;
}

const PackContext = React.createContext<PackContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function PackProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<PackDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TPack | null>(null);

  return (
    <PackContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </PackContext.Provider>
  );
}

export const usePack = () => {
  const packContext = React.useContext(PackContext);

  if (!packContext) {
    throw new Error('usePack has to be used within <PackContext>');
  }

  return packContext;
};
