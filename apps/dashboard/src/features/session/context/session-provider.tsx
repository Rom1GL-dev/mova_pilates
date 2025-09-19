import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state.tsx';
import { TSession } from '@/features/session/types/TSession.ts';

type SessionDialogType = 'edit' | 'delete';

interface SessionContextType {
  open: SessionDialogType | null;
  setOpen: (str: SessionDialogType | null) => void;
  currentRow: TSession | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TSession | null>>;
}

const SessionContext = React.createContext<SessionContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<SessionDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TSession | null>(null);

  return (
    <SessionContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const sessionContext = React.useContext(SessionContext);

  if (!sessionContext) {
    throw new Error('useSession has to be used within <PackContext>');
  }

  return sessionContext;
};
