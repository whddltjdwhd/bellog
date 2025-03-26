import React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return node.toString();
  }

  if (Array.isArray(node)) {
    return node.map((child) => extractText(child)).join("");
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(element.props.children);
  }

  return "";
}

export function Pre({ children, className, ...props }: CodeProps) {
  const codeStr = extractText(children);
  const language = className?.replace(/language-/, "") || "javascript";
  const grammar = Prism.languages[language];

  const highlightedCode = grammar
    ? Prism.highlight(codeStr, grammar, language)
    : codeStr;

  return (
    <pre className={`language-${language}`} {...props}>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </pre>
  );
}
