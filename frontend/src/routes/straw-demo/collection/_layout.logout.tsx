import { Sandbox } from '@/components/features/sandbox';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { useLogout } from 'frappe-straw';

export const Route = createFileRoute('/straw-demo/collection/_layout/logout')({
  context: () => ({
    crumb: 'Logout',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, logout } = useLogout();

  return (
    <Sandbox
      title="Logout"
      description="Logout from the system."
      exampleCode={exampleCode}
      response={data}
      error={error}
    >
      <Button onClick={logout}>Logout</Button>
    </Sandbox>
  );
}

const exampleCode = `import { useLogout } from 'frappe-straw';

const { data, error, logout } = useLogout();

return <Button onClick={logout}>Logout</Button>
`;
