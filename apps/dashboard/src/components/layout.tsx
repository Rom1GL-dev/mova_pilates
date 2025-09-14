import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/breadcrumbs';

interface Props {
  breadcrumbs: string[];
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  breadcrumbs = [],
  children,
  title,
  description
}: Props) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#f3e8de]">
        <AppSidebar />

        <SidebarInset className="flex flex-1 flex-col">
          <header className="flex h-14 items-center border-b px-4">
            <SidebarTrigger className="mr-2" />

            <Breadcrumbs className="text-lg font-semibold">
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem
                  key={index}
                  isLast={index === breadcrumbs.length - 1}
                >
                  {crumb}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            {title && (
              <div className={'mb-6'}>
                <h1 className={'text-2xl font-bold'}>{title}</h1>
                {description && <p>{description}</p>}
              </div>
            )}
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
