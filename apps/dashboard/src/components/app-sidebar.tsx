'use client';

import * as React from 'react';
import { Book, Box, CoinsIcon, Users } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.tsx';

const data = {
  navMain: [
    {
      title: 'Utilisateurs',
      url: APP_ROUTES.users.getHref(),
      icon: Users
    },
    {
      title: 'Type de cours',
      url: APP_ROUTES.typesCourse.getHref(),
      icon: Book
    },
    {
      title: 'Type de packs',
      url: APP_ROUTES.packs.getHref(),
      icon: Box
    },
    {
      title: 'Type de crédits',
      url: APP_ROUTES.credits.getHref(),
      icon: CoinsIcon
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} className={'bg-[#f3e8de]'}>
      <SidebarHeader className={'bg-[#f3e8de]'}>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={APP_ROUTES.app.getHref()}>
              <img src={'/logo.png'} alt="Logo" className={'w-full'} />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className={'bg-[#f3e8de]'}>
        <NavMain label={'Gestion'} items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className={'bg-[#f3e8de]'}>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
