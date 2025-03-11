import { Sandbox } from '@/components/features/sandbox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { JsonCompatible } from '@/types/json';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import { useResource } from 'frappe-straw';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
  const formSchema = z.object({
    url: z.string().nonempty(),
    autoRefresh: z.boolean(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      autoRefresh: true,
    },
  });

  const url = useDebounce(form.watch('url'), 500);
  const { data, error, loading, refresh } = useResource<JsonCompatible>(url);

  useEffect(() => {
    if (form.watch('autoRefresh') && url) {
      refresh();
    }
  }, [form.watch('autoRefresh'), url]);

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(refresh)} className="w-96 space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Url can be any Frappe method, internal Url, or external Url.
                  Try one of the following:
                </FormDescription>
                <ul className="my-2 cursor-pointer list-disc space-y-2 text-sm text-neutral-800">
                  {exampleUrls.map((url) => (
                    <li key={url}>
                      <a onClick={() => field.onChange(url)}>{url}</a>
                    </li>
                  ))}
                </ul>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="autoRefresh"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Auto Refresh</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={refresh} disabled={loading} className="w-full">
            <Loader2Icon
              className={cn('hidden', {
                'block animate-spin': loading,
              })}
            />
            Refresh
          </Button>
        </form>
      </Form>
    </Sandbox>
  );
}

const exampleCode = `import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useResource } from 'frappe-straw';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  url: z.string().nonempty(),
});

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  },
});

const { data, error, loading, refresh } = useResource<JsonCompatible>(
  form.watch('url'),
);

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(refresh)} className="w-96 space-y-4">
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type='submit' disabled={loading}>
        <Loader2Icon
          className={cn('hidden', {
            'block animate-spin': loading,
          })}
        />
        Refresh
      </Button>
    </form>
  </Form>
)
`;
