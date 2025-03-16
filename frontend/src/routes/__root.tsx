import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Toaster } from '@/components/ui/sonner';
import { Outlet, createRootRoute, useMatches } from '@tanstack/react-router';
import React from 'react';

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="flex h-screen w-screen flex-col">
        <Toaster theme="light" />
        <Header />
        <div className="grow overflow-hidden">
          <Outlet />
        </div>
      </div>
    );
  },
});

const Header = () => {
  const matches = useMatches();
  const parents = matches
    .filter((match) => match.staticData.crumb)
    .slice(0, -1);
  const page = matches.filter((match) => match.staticData.crumb).at(-1)
    ?.staticData.crumb;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-8">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/straw-demo">
                <span className="font-cursive text-xl">Frappe Straw Demo</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {parents.map(({ fullPath, staticData: { crumb } }) => (
              <React.Fragment key={fullPath}>
                <BreadcrumbSeparator key={fullPath} />
                <BreadcrumbItem>
                  <BreadcrumbLink href={fullPath}>{crumb}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
