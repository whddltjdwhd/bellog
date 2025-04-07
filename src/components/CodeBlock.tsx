import React, { JSX, isValidElement } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  children: React.ReactNode;
}

interface CodeElementProps {
  children?: string;
  className?: string;
}

// meta 정보를 파싱하는 헬퍼 함수
function parseMeta(className?: string) {
  const result = {
    highlight: [] as number[],
    title: "",
    language: "javascript",
  };
  if (!className) return result;

  // 언어 추출
  const languageMatch = className.match(/language-([\w]+)/);
  if (languageMatch) {
    result.language = languageMatch[1];
  }

  // highlight 줄 정보: {2,4-5}
  const highlightMatch = className.match(/{([^}]+)}/);
  if (highlightMatch) {
    const parts = highlightMatch[1].split(",");
    parts.forEach((part) => {
      const rangeMatch = part.trim().match(/^(\d+)-(\d+)$/);
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1], 10);
        const end = parseInt(rangeMatch[2], 10);
        for (let i = start; i <= end; i++) {
          result.highlight.push(i);
        }
      } else {
        const num = parseInt(part.trim(), 10);
        if (!isNaN(num)) {
          result.highlight.push(num);
        }
      }
    });
  }

  const titleMatch = className.match(/title=([\w\s.\-]+)/);
  if (titleMatch) {
    result.title = titleMatch[1].trim();
  }

  return result;
}

const containerStyle: React.CSSProperties = {
  margin: "20px 0",
  position: "relative",
};

const titleStyle: React.CSSProperties = {
  userSelect: "none",
  background: "#f5f5f5",
  padding: "8px 15px",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  border: "1px solid #e1e1e1",
  borderBottom: "none",
  fontWeight: "bold",
  fontSize: "clamp(14px, 2vw, 18px)",
};

const lineNumberStyle: React.CSSProperties = {
  userSelect: "none",
  width: "50px",
  textAlign: "end",
  padding: "0 15px 0 10px",
  color: "#6a6192",
  flexShrink: 0,
  fontSize: "clamp(12px, 1.5vw, 16px)",
};

const preStyle: React.CSSProperties = {
  padding: "10px 0",
  margin: 0,
  overflowX: "auto",
  fontSize: "clamp(12px, 1.5vw, 16px)",
};

export default function CodeBlock({ children }: CodeBlockProps): JSX.Element {
  if (!isValidElement(children)) {
    return <div>코드 파싱이 제대로 이루어지지 않았습니다.</div>;
  }

  const { className: codeClassName } = children.props as CodeElementProps;
  const { title, highlight, language } = parseMeta(codeClassName);

  const { children: codeString } = children.props as CodeElementProps;
  const code = typeof codeString === "string" ? codeString : "";

  return (
    <div style={containerStyle}>
      {title && <div style={titleStyle}>{title}</div>}
      <Highlight theme={themes.dracula} code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => {
          const slicedTokens = tokens.slice(0, -1);
          return (
            <pre
              style={{
                ...style,
                ...preStyle,
                borderRadius: title ? "0 0 10px 10px" : "10px",
              }}
            >
              {slicedTokens.map((line, i) => {
                const lineNumber = i + 1;
                const isHighlighted = highlight.includes(lineNumber);
                return (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    style={{
                      backgroundColor: isHighlighted
                        ? "rgba(245, 213, 170, 0.2)"
                        : "transparent",
                      display: "flex",
                    }}
                  >
                    <span
                      className="line-number"
                      style={{
                        ...lineNumberStyle,
                        borderLeft: isHighlighted
                          ? "3px solid #f4dc7d"
                          : "none",
                      }}
                    >
                      {lineNumber}
                    </span>
                    <span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          );
        }}
      </Highlight>
    </div>
  );
}
