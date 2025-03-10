import { Code } from './code';

export const Control = ({
  title,
  description,
  code,
  response,
}: {
  title: string;
  description: string;
  code: string;
  response?: Record<any, any>;
}) => (
  <div className="prose divide-y overflow-auto border-l border-neutral-200 bg-neutral-100">
    <div className="px-4">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className="px-4">
      <h4>Response</h4>
      <Code
        code={JSON.stringify(response, null, 2) ?? 'undefined'}
        options={{
          lang: 'json',
          theme: 'catppuccin-mocha',
        }}
      />
    </div>
    <div className="px-4">
      <h4>Code</h4>
      <Code
        code={code}
        options={{
          lang: 'typescript',
          theme: 'catppuccin-mocha',
        }}
      />
    </div>
  </div>
);
