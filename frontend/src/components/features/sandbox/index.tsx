import { JsonCompatible } from '@/types/json';
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
  error: Error | null;
}>) => (
  <div className="grid h-full w-full grid-cols-3">
    <div className="col-span-2 flex items-center justify-center">
      {children}
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
