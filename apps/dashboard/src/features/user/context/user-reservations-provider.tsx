import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state.tsx';
import { UserReservations } from '@/features/user/types/TUserReservations.ts';

type UserReservationsDialogType = 'edit' | 'delete';

interface UserReservationsContextType {
  open: UserReservationsDialogType | null;
  setOpen: (str: UserReservationsDialogType | null) => void;
  currentRow: UserReservations | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<UserReservations | null>>;
}

const UserReservationsContext =
  React.createContext<UserReservationsContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function UserReservationsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UserReservationsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<UserReservations | null>(null);

  return (
    <UserReservationsContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </UserReservationsContext.Provider>
  );
}

export const useUserReservations = () => {
  const announcesContext = React.useContext(UserReservationsContext);

  if (!announcesContext) {
    throw new Error(
      'useUserReservations has to be used within <UserReservationsContext>'
    );
  }

  return announcesContext;
};
