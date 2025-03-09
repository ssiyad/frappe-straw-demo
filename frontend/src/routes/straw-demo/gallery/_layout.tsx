import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/straw-demo/gallery/_layout')({
  component: () => (
    <div>
      <h1 className="mb-4 w-max bg-neutral-200 px-3 py-2 text-2xl font-bold">
        Gallery
      </h1>
      <Outlet />
    </div>
  ),
});
