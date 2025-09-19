import { TPack } from '@/features/pack/types/TPack.ts';
import { PackUpdateForm } from '@/features/pack/components/pack-update-form.tsx';

interface Props {
  pack: TPack;
}

export function PackTabInformation({ pack }: Props) {
  return (
    <div className={'grid gap-x-10 lg:grid-cols-2'}>
      <PackUpdateForm pack={pack} />
    </div>
  );
}
