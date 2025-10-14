import {
  TTypeCourse,
  TypeOfCourse
} from '@/features/type-course/types/TTypeCourse';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course';
import { TYPE_COURSE_DATA } from '@/features/type-course/utils/type-course-data';
import { UserUpdateForm } from '@/features/user/components/user-update-form.tsx';
import { UserWalletCreditModal } from '@/features/user/components/user-wallet-credit-modal.tsx';
import { TUser } from '@/features/user/types/TUser.ts';
import { TWallet } from '@/features/user/types/TWallet.ts';
import { useListAllWalletsByUser } from '@/features/user/usecases/list-all-wallets-by-user/list-all-wallets-by-user.tsx';
import { cn } from '@/lib/utils';
import { Badge } from '@mui/material';

interface Props {
  user: TUser;
}

export function UserTabInformation({ user }: Props) {
  const { data: walletsResponse, isLoading } = useListAllWalletsByUser(user.id);
  const wallets = walletsResponse ?? [];
  const { data: typeCoursesResponse } = useListTypesCourse();
  const typesCourses = typeCoursesResponse?.data?.typeCourse ?? [];

  if (isLoading || !wallets) {
    return (
      <div className={'flex min-h-screen w-full items-center justify-center'}>
        <div
          className={
            'border-primary h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-transparent'
          }
        ></div>
      </div>
    );
  }
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
            Solde de crédits
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {wallets.wallets.length === 0 && (
              <div className="text-sm text-gray-500">
                Aucun portefeuille de crédits trouvé.
              </div>
            )}

            {wallets.wallets.map((wallet: TWallet) => {
              const typeCourse = typesCourses?.find(
                (type: TTypeCourse) => type.id === wallet.typeCourseId
              );

              const typeCourseData =
                TYPE_COURSE_DATA[typeCourse.typeCourse as TypeOfCourse];
              return (
                <div>
                  <div
                    key={wallet.typeCourseId}
                    className={
                      'flex items-center justify-between rounded-md border border-[#b28053] bg-white p-3'
                    }
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={'font-medium'}>{wallet.label}</div>
                        <Badge
                          className={cn(
                            typeCourseData.className,
                            'rounded px-2 text-sm'
                          )}
                        >
                          {typeCourseData.label}
                        </Badge>
                      </div>
                      <div className={'text-sm text-gray-500'}>
                        Crédit actuel : {wallet.balance}
                      </div>
                    </div>
                    <UserWalletCreditModal wallet={wallet} user={user} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
