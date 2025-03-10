import { Outlet, createRootRoute } from '@tanstack/react-router';

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

const Header = () => (
  <header className="box-border flex h-14 items-center justify-between border-b px-8">
    <div>
      <span className="font-semibold">Frappe Straw</span> Demo
    </div>
  </header>
);
