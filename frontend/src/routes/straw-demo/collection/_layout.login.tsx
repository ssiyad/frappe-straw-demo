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

export const Route = createFileRoute('/straw-demo/collection/_layout/login')({
  staticData: {
    crumb: 'Login',
    description: 'Login using username and password.',
  },
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

  const { data, error, login } = useLogin();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values);
  };

  return (
    <Sandbox
      title="Login"
      description="Login to Frappe using username and password."
      exampleCode={exampleCode}
      response={data}
      error={error}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
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

const exampleCode = `import { useForm } from 'react-hook-form';
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

const { data, login } = useLogin();

const onSubmit = (values: z.infer<typeof formSchema>) => {
  login(values);
};
`;
