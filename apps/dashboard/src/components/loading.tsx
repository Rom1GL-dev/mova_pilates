import { cn } from '@/lib/utils.ts';

interface Props {
  size?: 'normal' | 'small';
}

export function Loading({ size = 'normal' }: Props) {
  return (
    <div
      className={cn(
        'border-primary animate-spin rounded-full border-solid border-t-transparent',
        {
          'h-5 w-5 border-2': size === 'small',
          'h-10 w-10 border-4': size === 'normal'
        }
      )}
    />
  );
}
