import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
  component: () => {
    return (
      <React.Fragment>
        <Header />
        <Outlet />
      </React.Fragment>
    );
  },
});

const Header = () => (
  <header className="box-border flex h-14 items-center justify-between border-b px-8">
    <div>
      <span className="font-semibold">Frappe Straw</span> Demo
    </div>
  </header>
);
