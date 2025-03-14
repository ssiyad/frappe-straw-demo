import { Sandbox } from '@/components/features/sandbox';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useListResource } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';
import { ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute(
  '/straw-demo/collection/_layout/list-resource',
)({
  staticData: {
    crumb: 'List Resource',
    description: 'Fetch a document list.',
  },
  component: RouteComponent,
});

function RouteComponent() {
  const formSchema = z.object({
    doctype: z.string().min(1, {
      message: 'DocType is required',
    }),
    fields: z.object({
      name: z.boolean(),
      owner: z.boolean(),
      modified: z.boolean(),
      module: z.boolean(),
      ref_doctype: z.boolean(),
      reference_report: z.boolean(),
      is_standard: z.boolean(),
      report_type: z.boolean(),
      letter_head: z.boolean(),
    }),
    limit: z.array(z.number()),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctype: 'Report',
      fields: {
        name: true,
        owner: false,
        modified: true,
        module: false,
        ref_doctype: true,
        reference_report: false,
        is_standard: false,
        report_type: true,
        letter_head: false,
      },
      limit: [3],
    },
  });

  const fields = form.watch('fields');
  const limit = form.watch('limit')[0];
  const { data, error, loading, useCount, refresh } =
    useListResource<BaseDocument>({
      doctype: form.watch('doctype'),
      fields: Object.keys(fields).filter((f) => fields[f]),
      limit,
    });
  const { data: count } = useCount();

  return (
    <Sandbox
      title="List Resource"
      description="Fetch a document list."
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
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel>Fields</FormLabel>
          <div className="flex flex-wrap items-center gap-2">
            {Object.keys(fields).map((f) => (
              <FormField
                control={form.control}
                name={`fields.${f}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor={field.name}
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {f
                            .replace('fields.', '')
                            .split('_')
                            .map((w) => w[0].toUpperCase() + w.slice(1))
                            .join(' ')}
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limit</FormLabel>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    onValueChange={field.onChange}
                    min={1}
                    max={10}
                    step={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            Showing {limit} of {count} entries.
          </FormDescription>
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

const exampleCode = `import { useListResource } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';

const { data, error, loading, useCount, refresh } = useListResource<BaseDocument>({
  doctype: 'Report',
  fields: ['name', 'report_type', 'ref_doctype', 'letter_head'],
  limit: 10,
});

const { data: count } = useCount();
`;
