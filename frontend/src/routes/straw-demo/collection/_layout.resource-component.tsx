import { Code, Sandbox } from '@/components/features/sandbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import { StrawResource } from 'frappe-straw';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute(
  '/straw-demo/collection/_layout/resource-component',
)({
  staticData: {
    crumb: 'Resource Component',
    description: 'Cleaner and simpler version of resource hook.',
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [url, setUrl] = useState(
    'https://jsonplaceholder.typicode.com/todos/3',
  );
  const urlDebounced = useDebounce(url, 300);

  return (
    <Sandbox
      title="Resource Component"
      description="Cleaner and simpler version of resource hook."
      exampleCode={exampleCode}
      error={null}
    >
      <StrawResource url={urlDebounced}>
        {({ data, loading }) => (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Url</Label>
              <Input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Data</Label>
              {loading && (
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Loader2Icon size={16} className="animate-spin" />
                  <span>Loading...</span>
                </div>
              )}
              <Code
                code={JSON.stringify(data, null, 2)}
                lang="json"
                className="prose w-96 max-w-none"
              />
            </div>
          </div>
        )}
      </StrawResource>
    </Sandbox>
  );
}

const exampleCode = `import { StrawResource } from 'frappe-straw';
import { Loader2Icon } from 'lucide-react';

<StrawResource url="https://jsonplaceholder.typicode.com/todos/3">
  {({ data, loading }) => (
    <section>
      {loading && (
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Loader2Icon size={16} className="animate-spin" />
          <span>Loading...</span>
        </div>
      )}
      <span>JSON.stringify(data, null, 2)</span>
    </section>
  )}
</StrawResource>
`;
