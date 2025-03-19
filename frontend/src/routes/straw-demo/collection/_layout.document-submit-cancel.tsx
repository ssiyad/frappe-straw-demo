import { Sandbox } from '@/components/features/sandbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';
import { useDocumentResource } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';

export const Route = createFileRoute(
  '/straw-demo/collection/_layout/document-submit-cancel',
)({
  staticData: {
    crumb: 'Submit and Cancel a Document',
    description: 'Fetch, submit and cancel a document.',
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data,
    error,
    canSubmit,
    canCancel,
    useStatus,
    useTimeAgo,
    useSubmit,
    useCancel,
  } = useDocumentResource<
    BaseDocument & {
      title: string;
      user: string;
      attempt: number;
      status: string;
      description?: string;
    }
  >('Straw Task', 'v0jl9ct6el');

  const status = useStatus();
  const { modifiedAt } = useTimeAgo();
  const { run: submit } = useSubmit();
  const { run: cancel } = useCancel();
  const onSubmit = () => submit();
  const onCancel = () => cancel();

  const badgeColor = {
    Draft: 'yellow',
    Submitted: 'green',
    Cancelled: 'red',
    Unknown: 'orange',
  }[status] as 'yellow' | 'green' | 'red' | 'orange';

  return (
    <Sandbox
      title="Submit and Cancel a Document"
      description="Fetch, submit and cancel a document."
      exampleCode={exampleCode}
      response={data}
      error={error}
    >
      <div className="w-96 space-y-4">
        <div className="space-y-2">
          <Label>Description</Label>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: data?.description ?? '',
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>DocStatus: {data?.docstatus}</Badge>
          <Badge variant={badgeColor}>Status: {status}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={onSubmit}
            disabled={!canSubmit}
          >
            Submit
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={onCancel}
            disabled={!canCancel}
          >
            Cancel
          </Button>
        </div>
        <span className="text-muted-foreground space-x-1 text-sm">
          <span>Last modified</span>
          <span>{modifiedAt}.</span>
        </span>
      </div>
    </Sandbox>
  );
}

const exampleCode = `import { useDocumentResource } from 'frappe-straw';

const { useSubmit, useCancel } = useDocumentResource(
  'Straw Task',
  'Task1',
);

const { run: submit } = useSubmit();
const { run: cancel } = useCancel();
const onSubmit = () => submit();
const onCancel = () => cancel();
`;
