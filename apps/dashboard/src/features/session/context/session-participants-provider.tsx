import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state.tsx';
import { TSessionParticipants } from '@/features/session/types/TSessionParticipants.ts';

type SessionParticipantsDialogType = 'edit' | 'delete';

interface SessionParticipantsContextType {
  open: SessionParticipantsDialogType | null;
  setOpen: (str: SessionParticipantsDialogType | null) => void;
  currentRow: TSessionParticipants | null;
  setCurrentRow: React.Dispatch<
    React.SetStateAction<TSessionParticipants | null>
  >;
}

const SessionParticipantsContext =
  React.createContext<SessionParticipantsContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function SessionParticipantsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<SessionParticipantsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TSessionParticipants | null>(
    null
  );

  return (
    <SessionParticipantsContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </SessionParticipantsContext.Provider>
  );
}

export const useSessionParticipants = () => {
  const sessionContext = React.useContext(SessionParticipantsContext);

  if (!sessionContext) {
    throw new Error(
      'useSessionParticipants has to be used within <PackContext>'
    );
  }

  return sessionContext;
};
