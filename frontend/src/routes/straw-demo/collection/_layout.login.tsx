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
import { toast } from 'sonner';
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

  const { data, error, login } = useLogin({
    onSuccess: (response) => {
      toast.success('Logged in as ' + response.full_name);
    },
  });

  const onSubmit = ({ username, password }: z.infer<typeof formSchema>) => {
    login(username, password);
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

const exampleCode = `import { useLogin } from 'frappe-straw';

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

const { data, error, login } = useLogin({
  onSuccess: (response) => {
    toast.success('Logged in as ' + response.full_name);
  },
});

const onSubmit = ({ username, password }: z.infer<typeof formSchema>) => {
  login(username, password);
};
`;
