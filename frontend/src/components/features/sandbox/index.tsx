import { JsonCompatible } from '@/types/json';
import { type StrawError } from 'frappe-straw/types/StrawError.ts';
import { PropsWithChildren } from 'react';
import { Control } from './control';
export { Code } from './code.tsx';

export const Sandbox = ({
  title,
  description,
  exampleCode,
  response,
  error,
  children,
}: PropsWithChildren<{
  title: string;
  description: string;
  exampleCode: string;
  response?: JsonCompatible;
  error: StrawError | null;
}>) => (
  <div className="grid h-full w-full grid-cols-3">
    <div className="col-span-2 flex items-center justify-center">
      <div className="max-w-lg">{children}</div>
    </div>
    <Control
      title={title}
      description={description}
      code={exampleCode}
      response={response}
      error={error}
    />
  </div>
);
