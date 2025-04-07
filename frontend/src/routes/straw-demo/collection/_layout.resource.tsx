import { Sandbox } from '@/components/features/sandbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import { useCacheInvalidate, useResource } from 'frappe-straw';
import { type JsonCompatible } from 'frappe-straw/types';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
  const cacheInvalidate = useCacheInvalidate();
  const cacheKey = {
    url,
  };

  const { data, error, loading, refresh } = useResource<JsonCompatible>(
    useDebounce(url, 300),
    {
      cache: cacheKey,
      cacheTime: '1m',
    },
  );

  const onCacheInvalidate = () => {
    cacheInvalidate(cacheKey, {
      onSuccess: () => toast.success('Cache invalidated'),
      onError: () => toast.error('Failed to invalidate cache'),
    });
  };

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
        {error && (
          <div
            className="text-destructive"
            dangerouslySetInnerHTML={{
              __html: error.message,
            }}
          />
        )}
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
        <Button
          onClick={onCacheInvalidate}
          disabled={loading}
          variant="secondary"
          className="w-full"
        >
          Invalidate Cache
        </Button>
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

const exampleCode = `import { useCacheInvalidate, useResource } from 'frappe-straw';
import { type JsonCompatible } from 'frappe-straw/types';

const url = 'https://jsonplaceholder.typicode.com/todos/3';
const cacheKey = {
  url,
};
const cacheInvalidate = useCacheInvalidate();
const onCacheInvalidate = () => {
  cacheInvalidate(cacheKey, {
    onSuccess: () => toast.success('Cache invalidated'),
    onError: () => toast.error('Failed to invalidate cache'),
  });
};
const { data, error, loading, refresh } = useResource<JsonCompatible>(url, {
  cache: cacheKey,
  cacheTime: '1m',
});
`;
