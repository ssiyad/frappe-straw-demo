import { Sandbox } from '@/components/features/sandbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { type JsonCompatible } from '@/types/json';
import { createFileRoute } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import { useResource } from 'frappe-straw';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/straw-demo/collection/_layout/resource')(
  {
    staticData: {
      crumb: 'Resource',
      description: 'Fetch data from a URL and handle loading and error states.',
    },
    component: RouteComponent,
  },
);

function RouteComponent() {
  const [url, setUrl] = useState(
    'https://jsonplaceholder.typicode.com/todos/1',
  );

  const { data, error, loading, refresh } = useResource<JsonCompatible>(
    useDebounce(url, 300),
  );

  const exampleUrls = [
    'frappe_straw_demo.api.demo.hello_world',
    '/api/method/frappe.auth.get_logged_user',
    'https://jsonplaceholder.typicode.com/todos/3',
  ];

  return (
    <Sandbox
      title="Resource"
      description="Fetch data from a URL and handle loading and error states."
      exampleCode={exampleCode}
      response={data}
      error={error}
    >
      <div className="space-y-4 text-sm">
        <Label>URL</Label>
        <Input value={url} onChange={(event) => setUrl(event.target.value)} />
        {error && <div className="text-destructive">{error.message}</div>}
        <div>
          Url can be any Frappe method, internal Url, or external Url. Try one
          of the following:
        </div>
        <div>
          <ul className="my-2 cursor-pointer list-disc space-y-2 text-sm text-neutral-800">
            {exampleUrls.map((url) => (
              <li key={url}>
                <a onClick={() => setUrl(url)}>{url}</a>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={() => refresh()} disabled={loading} className="w-full">
          <Loader2Icon
            className={cn('hidden', {
              'block animate-spin': loading,
            })}
          />
          Refresh
        </Button>
      </div>
    </Sandbox>
  );
}

const exampleCode = `import { useResource } from 'frappe-straw';
import { type JsonCompatible } from '@/types/json';

const url = 'https://jsonplaceholder.typicode.com/todos/3';
const { data, error, loading, refresh } = useResource<JsonCompatible>(url);
`;
