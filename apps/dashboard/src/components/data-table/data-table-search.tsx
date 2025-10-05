import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

interface Props {
  placeholder?: string;
  table: any;
}

export function DataTableSearch({
  placeholder = 'Rechercher...',
  table
}: Props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(value || undefined);
    }, 200);

    return () => clearTimeout(timeout);
  }, [value, table]);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="focus:none h-8 w-64 bg-white"
    />
  );
}
