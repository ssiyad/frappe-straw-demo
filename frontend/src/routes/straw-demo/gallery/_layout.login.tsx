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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useLogin } from 'frappe-straw';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/straw-demo/gallery/_layout/login')({
  context: () => ({
    crumb: 'Login',
  }),
  component: RouteComponent,
});

function RouteComponent() {
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

  return (
    <Sandbox
      title="Login"
      description="Login to Frappe using username and password."
      exampleCode={exampleCode}
      response={data}
    >
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
    </Sandbox>
  );
}

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
