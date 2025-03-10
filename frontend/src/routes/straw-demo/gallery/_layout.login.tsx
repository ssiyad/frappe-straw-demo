import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useLogin } from 'frappe-straw';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { codeToHtml } from 'shiki';
import { z } from 'zod';

export const Route = createFileRoute('/straw-demo/gallery/_layout/login')({
  context: () => ({
    crumb: 'Login',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const [responseHtml, setResponseHtml] = useState('');
  const [codeHtml, setCodeHtml] = useState('');

  const exampleCode = `
  import { useForm } from 'react-hook-form';
  import { useLogin } from 'frappe-straw';
  import { z } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';

  const formSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { data, login } = useLogin({
    username: form.watch('username'),
    password: form.watch('password'),
  });

  const onSubmit = form.handleSubmit(login);
  `;

  const formSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { data, login } = useLogin({
    username: form.watch('username'),
    password: form.watch('password'),
  });

  useEffect(() => {
    codeToHtml(JSON.stringify(data ?? {}, null, 2), {
      lang: 'json',
      theme: 'catppuccin-mocha',
    }).then(setResponseHtml);

    codeToHtml(exampleCode, {
      lang: 'typescript',
      theme: 'catppuccin-mocha',
    }).then(setCodeHtml);
  }, [data, exampleCode]);

  return (
    <div className="grid h-full w-full grid-cols-3">
      <div className="col-span-2 flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(login)} className="w-96 space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="hello@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div className="prose divide-y overflow-auto border-l border-neutral-200 bg-neutral-100">
        <div className="px-4">
          <h3>Login</h3>
          <p>Login to Frappe using username and password.</p>
        </div>
        <div className="px-4">
          <h4>Response</h4>
          <div
            dangerouslySetInnerHTML={{
              __html: responseHtml,
            }}
          />
        </div>
        <div className="px-4">
          <h4>Code</h4>
          <div
            dangerouslySetInnerHTML={{
              __html: codeHtml,
            }}
          />
        </div>
      </div>
    </div>
  );
}
