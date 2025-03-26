import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

interface CodeElementProps {
  children?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  let code = "";
  let language = "javascript";

  if (React.isValidElement(children)) {
    const { children: codeChildren, className: codeClassName } =
      children.props as CodeElementProps;

    code = typeof codeChildren === "string" ? codeChildren : "";
    if (codeClassName && typeof codeClassName === "string") {
      language = codeClassName.replace(/language-/, "");
    }
  } else if (typeof children === "string") {
    code = children;
  }

  if (!code) return <div>코드 파싱이 제대로 이루어지지 않았습니다.</div>;

  return (
    <Highlight theme={themes.dracula} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => {
        const slicedTokens = tokens.slice(0, -1);

        return (
          <pre
            style={{
              ...style,
              borderRadius: "10px",
              padding: "10px 0",
              margin: "20px 0",
            }}
          >
            {slicedTokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span style={{ padding: "0 15px 0 10px", color: "#6a6192" }}>
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        );
      }}
    </Highlight>
  );
};

export default CodeBlock;
