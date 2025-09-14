import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  children: React.ReactNode;
  className?: string;
}

export function Breadcrumbs({ children, className }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-1 ${className}`}>{children}</nav>
  );
}

interface BreadcrumbItemProps {
  children: React.ReactNode;
  isLast?: boolean;
}

export function BreadcrumbItem({
  children,
  isLast = false
}: BreadcrumbItemProps) {
  return (
    <div className="text-md flex items-center space-x-1">
      <span className={isLast ? 'font-semibold' : 'font-normal'}>
        {children}
      </span>
      {!isLast && <ChevronRight className="h-5 w-5 text-gray-400" />}
    </div>
  );
}
