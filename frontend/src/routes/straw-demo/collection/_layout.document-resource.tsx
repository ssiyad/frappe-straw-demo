import { Sandbox } from '@/components/features/sandbox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useDocumentResource, useListResource } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';
import { ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute(
  '/straw-demo/collection/_layout/document-resource',
)({
  staticData: {
    crumb: 'Document Resource',
    description: 'Fetch a document.',
  },
  component: RouteComponent,
});

function RouteComponent() {
  const formSchema = z.object({
    doctype: z.string().min(1, {
      message: 'DocType is required',
    }),
    docname: z.string().min(1, {
      message: 'Doc Name is required',
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctype: 'Role',
      docname: 'Guest',
    },
  });

  const { data: doctypes = [] } = useListResource<{
    name: string;
  }>({
    doctype: 'DocType',
    limit: 100,
  });

  const { data: docnames = [], refresh: refreshDocNames } = useListResource<{
    name: string;
  }>({
    doctype: form.watch('doctype'),
    limit: 100,
  });

  const { data, error, loading, refresh } = useDocumentResource<BaseDocument>(
    form.watch('doctype'),
    form.watch('docname'),
  );

  const doctype = form.watch('doctype');
  useEffect(() => {
    if (doctype) {
      refreshDocNames();
    }
  }, [doctype]);

  return (
    <Sandbox
      title="Document Resource"
      description="Fetch a document."
      exampleCode={exampleCode}
      response={data}
      error={error}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(refresh)} className="w-96 space-y-4">
          <FormField
            control={form.control}
            name="doctype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DocType</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {doctypes.map((doctype) => (
                      <SelectItem value={doctype.name}>
                        {doctype.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="docname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doc Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {docnames.map((docname) => (
                      <SelectItem value={docname.name}>
                        {docname.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            Fetch
          </Button>
          <Link to="/straw-demo/collection/login">
            <Button type="button" role="link" variant="link" className="w-full">
              Trouble fetching? Try to login
              <ArrowRightIcon />
            </Button>
          </Link>
        </form>
      </Form>
    </Sandbox>
  );
}

const exampleCode = `import { useDocumentResource } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';

const { data, error, loading, refresh } = useDocumentResource<BaseDocument>(
  'Role',
  'Guest',
  {
    fetchOnMount: false,
  },
);
`;
