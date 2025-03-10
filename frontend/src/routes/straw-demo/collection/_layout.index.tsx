import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';

export const Route = createFileRoute('/straw-demo/collection/_layout/')({
  component: () => (
    <div className="grid grid-cols-3 gap-3 p-8">
      {[
        {
          module: 'Auth',
          name: 'Login',
          description: 'Login using username and password.',
          to: '/straw-demo/collection/login',
        },
        {
          module: 'Auth',
          name: 'Current User',
          description: 'Get currently logged in user.',
          to: '/straw-demo/collection/current-user',
        },
      ].map(({ module, name, description, to }) => (
        <div className="space-y-2 rounded border p-4">
          <div className="flex w-full items-center justify-between">
            <div className="space-x-1 font-semibold">
              <span className="text-neutral-700">{module}</span>
              <span className="text-neutral-700">/</span>
              <span>{name}</span>
            </div>
            <Link to={to}>
              <div className="flex cursor-pointer items-center text-sm">
                Try now
                <ArrowRightIcon size={16} className="ml-2" />
              </div>
            </Link>
          </div>
          <div className="text-sm">{description}</div>
        </div>
      ))}
    </div>
  ),
});
