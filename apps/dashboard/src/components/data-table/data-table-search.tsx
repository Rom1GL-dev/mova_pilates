import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

interface Props {
  placeholder?: string;
  column: string;
  table: any;
}

export function DataTableSearch({
  placeholder = 'Rechercher...',
  column,
  table
}: Props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      table.getColumn(column)?.setFilterValue(value || undefined);
    }, 200); // debounce

    return () => clearTimeout(timeout);
  }, [value, column, table]);

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
