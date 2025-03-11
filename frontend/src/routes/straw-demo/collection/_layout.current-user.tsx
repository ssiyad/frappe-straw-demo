import { Sandbox } from '@/components/features/sandbox';
import { createFileRoute } from '@tanstack/react-router';
import { useCurrentUser } from 'frappe-straw';

export const Route = createFileRoute(
  '/straw-demo/collection/_layout/current-user',
)({
  staticData: {
    crumb: 'Get Current User',
    description: 'Get current logged in user.',
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error } = useCurrentUser();

  return (
    <Sandbox
      title="Get Current User"
      description="Get current logged in user."
      exampleCode={exampleCode}
      response={data}
      error={error}
    >
      Current user is <span className="ml-1 font-medium">{data}</span>
    </Sandbox>
  );
}

const exampleCode = `import { useCurrentUser } from 'frappe-straw';

const { data, error } = useCurrentUser();
`;
