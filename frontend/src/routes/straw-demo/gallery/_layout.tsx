import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/straw-demo/gallery/_layout')({
  component: () => (
    <div className="h-full w-full">
      <Outlet />
    </div>
  ),
});
