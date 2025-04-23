import { Code, Sandbox } from '@/components/features/sandbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useDocument } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';
import { ArrowRightIcon, LucideCheck, LucidePlus, LucideX } from 'lucide-react';

export const Route = createFileRoute(
  '/straw-demo/collection/_layout/document-method',
)({
  staticData: {
    crumb: 'Run Doc Method',
    description: 'Execute a whitelisted method on a document.',
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, useMethod } = useDocument<
    BaseDocument & {
      title: string;
      user: string;
      attempt: number;
      status: string;
      description?: string;
    }
  >('Straw Task', 'qp8r9rhj21');

  const { run: incrementAttempt } = useMethod('increment_attempt');
  const { run: updateStatus } = useMethod('update_status');

  enum BadgeColor {
    Done = 'green',
    Cancelled = 'red',
    Default = 'default',
  }

  const getBadgeColor = (status?: string) => {
    switch (status) {
      case 'Done':
        return BadgeColor.Done;
      case 'Cancelled':
        return BadgeColor.Cancelled;
      default:
        return BadgeColor.Default;
    }
  };

  return (
    <Sandbox
      title="Run Doc Method"
      description="Execute a whitelisted method on a document."
      exampleCode={exampleCode}
      response={data}
      error={error}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Controller Code</Label>
          <Code code={controllerCode} lang="python" className="prose" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Attempts - {data?.attempt}</Badge>
          <Badge variant={getBadgeColor(data?.status)}>
            Status - {data?.status}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="secondary" onClick={() => incrementAttempt()}>
            <LucidePlus />
            Increment Attempt
          </Button>
          <Button
            variant="secondary"
            onClick={() => updateStatus({ status: 'Done' })}
          >
            <LucideCheck />
            Mark as Done
          </Button>
          <Button
            variant="secondary"
            onClick={() => updateStatus({ status: 'Cancelled' })}
          >
            <LucideX />
            Cancel Task
          </Button>
        </div>
        <Link to="/straw-demo/collection/login">
          <Button type="button" role="link" variant="link" className="w-full">
            Trouble fetching? Try to login
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </Sandbox>
  );
}

const controllerCode = `class StrawTask(Document):
	@frappe.whitelist()
	def increment_attempt(self):
		self.attempt += 1
		self.save()

	@frappe.whitelist()
	def update_status(self, status: str):
		self.status = status
		self.save()
`;

const exampleCode = `import { useDocument } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';

const { data, error, refresh, useMethod } = useDocument<BaseDocument>(
  'Straw Task',
  'Task1',
);

const { run: incrementAttempt } = useMethod('increment_attempt');
const { run: updateStatus } = useMethod('update_status');

<Button onClick={() => incrementAttempt()}>
  <LucidePlus />
  Increment Attempt
</Button>
<Button onClick={() => updateStatus({ status: 'Done' })}>
  <LucideCheck />
  Mark as Done
</Button>
<Button onClick={() => updateStatus({ status: 'Cancelled' })}>
  <LucideX />
  Cancel Task
</Button>
`;
