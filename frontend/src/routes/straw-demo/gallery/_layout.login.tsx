import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/straw-demo/gallery/_layout/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/straw-demo/gallery/login"!</div>;
}
