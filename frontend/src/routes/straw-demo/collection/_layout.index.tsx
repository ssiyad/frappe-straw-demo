import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/straw-demo/collection/_layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-3 gap-3 p-8">
      {[
        {
          name: 'Login',
          description: 'Login using username and password.',
          to: '/straw-demo/collection/login',
        },
        {
          name: 'Current User',
          description: 'Get currently logged in user.',
          to: '/straw-demo/collection/current-user',
        },
        {
          name: 'Logout',
          description: 'Logout from the system.',
          to: '/straw-demo/collection/logout',
        },
        {
          name: 'Resource',
          description:
            'Fetch data from a URL and handle loading and error states.',
          to: '/straw-demo/collection/resource',
        },
      ].map(({ name, description, to }) => (
        <Link to={to}>
          <div className="space-y-2 rounded border p-4 hover:bg-neutral-50">
            <div className="font-semibold">{name}</div>
            <div className="text-sm">{description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
