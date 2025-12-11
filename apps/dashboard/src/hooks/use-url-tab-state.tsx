import { useSearchParams } from 'react-router-dom';

export function useUrlTabState(paramKey: string, defaultValue: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const current = searchParams.get(paramKey) ?? defaultValue;

  const setCurrent = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value === defaultValue) {
          next.delete(paramKey);
        } else {
          next.set(paramKey, value);
        }

        return next;
      },
      { replace: true }
    );
  };

  return [current, setCurrent] as const;
}
