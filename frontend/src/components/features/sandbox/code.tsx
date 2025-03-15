import { useState } from 'react';
import { BundledLanguage, codeToHtml, SpecialLanguage } from 'shiki';

export const Code = ({
  code,
  lang,
  className,
}: {
  code: string;
  lang: BundledLanguage | SpecialLanguage;
  className?: string;
}) => {
  const [html, setHtml] = useState('');
  codeToHtml(code, {
    theme: 'one-light',
    lang,
  }).then(setHtml);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
