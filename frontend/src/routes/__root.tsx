import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Outlet, createRootRoute, useMatches } from '@tanstack/react-router';
import React from 'react';

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="flex h-screen w-screen flex-col">
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

  return (
    <header className="flex h-14 shrink-0 items-center justify-between px-8 shadow-sm">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/straw-demo">
                <span className="font-cursive text-xl">Frappe Straw Demo</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {matches
              .slice(0, -1)
              .filter(({ context }) => context.crumb)
              .map(({ fullPath, context: { crumb } }) => (
                <React.Fragment>
                  <BreadcrumbSeparator key={fullPath} />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={fullPath}>{crumb}</BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{matches.at(-1)?.context.crumb}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
