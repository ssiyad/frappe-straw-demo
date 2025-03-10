import { createFileRoute, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/straw-demo/')({
  component: RouteComponent,
});

function RouteComponent() {
  useRouter().navigate({
    to: '/straw-demo/collection',
  });
}
