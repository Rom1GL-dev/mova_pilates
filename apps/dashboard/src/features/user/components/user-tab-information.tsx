import { TUser } from '@/features/user/types/TUser.ts';
import { UserUpdateForm } from '@/features/user/components/user-update-form.tsx';

interface Props {
  user: TUser;
}

export function UserTabInformation({ user }: Props) {
  return (
    <div className={'grid gap-x-10 lg:grid-cols-2'}>
      <UserUpdateForm user={user} />
      <div className={'mt-10 lg:mt-0'}>
        <div
          className={
            'w-full rounded-md border border-[#b28053] bg-[#FCF6F0] p-3'
          }
        >
          <div className={'text-xl font-medium text-[#b28053]'}>
            Crédits disponible
          </div>
        </div>
      </div>
    </div>
  );
}
