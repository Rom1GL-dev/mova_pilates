import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export default function Layout({ title, children }: Props) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#f3e8de]">
        <AppSidebar />

        <SidebarInset className="flex flex-1 flex-col">
          <header className="flex h-14 items-center border-b px-4">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-lg font-semibold">{title}</h1>
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
