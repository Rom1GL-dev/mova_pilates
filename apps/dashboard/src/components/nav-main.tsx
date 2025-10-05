import { type LucideIcon } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

export function NavMain({
  label,
  items
}: {
  label: string;
  items: {
    title: string;
    url?: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup className={'bg-[#f3e8de]'}>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu className={'bg-[#f3e8de]'}>
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <SidebarMenuItem
              className={
                isActive
                  ? 'rounded-md bg-[#b28053] text-white'
                  : `${!item.url && 'cursor-not-allowed opacity-50'} rounded-md hover:bg-[#b28053] hover:text-white`
              }
              key={item.title}
            >
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
