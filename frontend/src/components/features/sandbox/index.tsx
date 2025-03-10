import { PropsWithChildren } from 'react';
import { Control } from './control';

export const Sandbox = ({
  title,
  description,
  exampleCode,
  response,
  children,
}: PropsWithChildren<{
  title: string;
  description: string;
  exampleCode: string;
  response?: Record<any, any>;
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
    />
  </div>
);
