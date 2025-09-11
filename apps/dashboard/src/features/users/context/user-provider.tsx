import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state.tsx';
import { TUser } from '@/features/users/types/TUser.ts';

type UserDialogType = 'edit' | 'delete';

interface UserContextType {
  open: UserDialogType | null;
  setOpen: (str: UserDialogType | null) => void;
  currentRow: TUser | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const UserContext = React.createContext<UserContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function UserProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UserDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TUser | null>(null);

  return (
    <UserContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const announcesContext = React.useContext(UserContext);

  if (!announcesContext) {
    throw new Error('useUser has to be used within <UserContext>');
  }

  return announcesContext;
};
