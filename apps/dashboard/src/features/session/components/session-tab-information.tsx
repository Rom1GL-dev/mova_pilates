import { SessionUpdateForm } from '@/features/session/components/session-update-form.tsx';
import { TSession } from '@/features/session/types/TSession.ts';

interface Props {
  session: TSession;
}

export function SessionTabInformation({ session }: Props) {
  return (
    <div className={'grid gap-x-10 lg:grid-cols-2'}>
      <SessionUpdateForm session={session} />
    </div>
  );
}
