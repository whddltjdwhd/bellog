import React, { isValidElement, JSX } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { parseMeta } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
}

interface CodeElementProps {
  children?: string;
  className?: string;
}

export default function CodeBlock({ children }: CodeBlockProps): JSX.Element {
  if (!isValidElement(children)) return <div>코드 파싱 오류</div>;

  const { className } = children.props as CodeElementProps;
  const { highlight, language, title } = parseMeta(className);
  const code = (children.props as CodeElementProps).children ?? "";
  const theme = themes.oceanicNext;

  return (
    <div style={{ margin: "20px 0", position: "relative" }}>
      {title && (
        <div
          style={{
            userSelect: "none",
            background: "#363b46",
            padding: "8px 15px",
            fontWeight: 700,
            fontSize: "clamp(14px,2vw,18px)",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            color: "#e6f1f3",
          }}
        >
          {title}
        </div>
      )}

      <Highlight
        code={typeof code === "string" ? code.trimEnd() : ""}
        theme={theme}
        language={language as string}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              padding: "10px 0",
              margin: 0,
              overflowX: "auto",
              fontSize: "clamp(12px,1.5vw,16px)",
              borderRadius: title ? "0 0 10px 10px" : 10,
            }}
          >
            {tokens.map((line, i) => {
              const lineNumber = i + 1;
              const isHighlighted = highlight.includes(lineNumber);
              return (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  style={{
                    display: "flex",
                    background: isHighlighted
                      ? "rgba(255,255,255,0.1)"
                      : "transparent",
                  }}
                >
                  <span
                    style={{
                      userSelect: "none",
                      width: 50,
                      textAlign: "end",
                      padding: "0 15px 0 10px",
                      color: isHighlighted ? "#e7b364" : "#a0a0a0",
                      flexShrink: 0,
                      borderLeft: isHighlighted ? "5px solid #feb84e" : "none",
                    }}
                  >
                    {lineNumber}
                  </span>
                  <span style={{ paddingRight: "30px" }}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
