import { JsonCompatible } from '@/types/json';
import { type StrawError } from 'frappe-straw/types';
import { Code } from './code';

export const Control = ({
  title,
  description,
  code,
  response,
  error,
}: {
  title: string;
  description: string;
  code: string;
  response?: JsonCompatible;
  error: StrawError | null;
}) => (
  <div className="prose divide-y overflow-auto border-l border-neutral-200 bg-neutral-100">
    <div className="px-4">
      <h3>{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
    <div className="px-4">
      <h4>Code</h4>
      <Code code={code} lang="tsx" />
    </div>
    <div className="px-4">
      <h4>Response</h4>
      <Code
        code={JSON.stringify(response, null, 2) ?? 'undefined'}
        lang="json"
      />
    </div>
    <div className="px-4">
      <h4>Error</h4>
      <Code code={JSON.stringify(error, null, 2) ?? 'undefined'} lang="json" />
    </div>
  </div>
);
