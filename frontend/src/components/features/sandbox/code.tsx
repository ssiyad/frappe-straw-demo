import { useState } from 'react';
import { BundledLanguage, codeToHtml, SpecialLanguage } from 'shiki';

export const Code = ({
  code,
  lang,
}: {
  code: string;
  lang: BundledLanguage | SpecialLanguage;
}) => {
  const [html, setHtml] = useState('');
  codeToHtml(code, {
    theme: 'catppuccin-mocha',
    lang,
  }).then(setHtml);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
