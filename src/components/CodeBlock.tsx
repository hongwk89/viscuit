import { useEffect } from 'react';
import hljs from 'highlight.js';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre>
      <code className={language}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
