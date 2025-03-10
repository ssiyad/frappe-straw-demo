import { useState } from 'react';
import {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  codeToHtml,
} from 'shiki';

export const Code = ({
  code,
  options,
}: {
  code: string;
  options: CodeToHastOptions<BundledLanguage, BundledTheme>;
}) => {
  const [html, setHtml] = useState('');
  codeToHtml(code, options).then(setHtml);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
