import { createFileRoute, Link, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/straw-demo/collection/_layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const routes = useRouter()
    .flatRoutes.filter((route) => {
      return (
        route.options.getParentRoute()._fullPath === '/straw-demo/collection'
      );
    })
    .filter(({ path }) => path !== '/')
    .map(({ path, options: { staticData } }) => ({
      to: path,
      name: staticData?.crumb,
      description: staticData?.description,
    }));

  return (
    <div className="grid grid-cols-3">
      {routes.map(({ name, description, to }) => (
        <Link to={to} key={to}>
          <div className="space-y-2 border-r border-b p-8">
            <div className="font-semibold">{name}</div>
            <div className="text-sm">{description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
