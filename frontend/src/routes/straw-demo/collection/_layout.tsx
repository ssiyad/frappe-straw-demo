import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/straw-demo/collection/_layout')({
  staticData: {
    crumb: 'Collection',
  },
  component: () => (
    <div className="h-full w-full">
      <Outlet />
    </div>
  ),
});
