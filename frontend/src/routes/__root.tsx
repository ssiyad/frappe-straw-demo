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
    <header className="box-border flex h-14 items-center justify-between border-b px-8">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/straw-demo">Home</BreadcrumbLink>
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
