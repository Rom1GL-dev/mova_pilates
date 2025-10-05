import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  optional?: string;
}

export function DashboardStatsCard({
  icon: Icon,
  value,
  optional,
  label
}: Props) {
  return (
    <div className="flex items-center gap-x-4 rounded-lg border border-[#f3e8de] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className=" flex items-center gap-3">
        <div className="rounded-lg bg-[#f3e8de] p-3">
          <Icon className="h-6 w-6 text-[#b28053]" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <div className="flex items-end gap-x-1 text-4xl font-bold text-gray-900">
          {value}
          {optional && (
            <p className="mb-1 text-sm font-light text-gray-600">ce mois-ci</p>
          )}
        </div>
      </div>
    </div>
  );
}
