import { Sandbox } from '@/components/features/sandbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TextEditor } from '@/components/ui/text-editor';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useDocumentResource } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';
import { ArrowRightIcon } from 'lucide-react';

export const Route = createFileRoute(
  '/straw-demo/collection/_layout/save-document',
)({
  staticData: {
    crumb: 'Save a Document',
    description: 'Fetch and update a document.',
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, useTimeAgo, useSave } = useDocumentResource<
    BaseDocument & {
      title: string;
      user: string;
      attempt: number;
      status: string;
      description?: string;
    }
  >('Straw Task', 'qp8r9rhj21');

  const { modifiedAt } = useTimeAgo();
  const { run: save } = useSave();
  const onSave = (content: string) => save({ description: content });

  return (
    <Sandbox
      title="Save a Document"
      description="Fetch and update a document."
      exampleCode={exampleCode}
      response={data}
      error={error}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Description</Label>
          <TextEditor initialContent={data?.description} onSave={onSave} />
          <span className="text-muted-foreground space-x-1 text-sm">
            <span>Last modified</span>
            <span>{modifiedAt}.</span>
          </span>
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

const exampleCode = `import { useDocumentResource } from 'frappe-straw';

const { useSave } = useDocumentResource(
  'Straw Task',
  'Task1',
);

const { run: save } = useSave();
const onSave = (content: string) => save({ description: content });

<TextEditor onSave={onSave} />
`;
