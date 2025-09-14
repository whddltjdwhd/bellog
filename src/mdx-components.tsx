import type { MDXComponents } from "mdx/types";
import React from "react";
import clsx from "clsx";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CodeBlock from "./components/mdx/CodeBlock";
import MDXImage from "./components/mdx/MDXImage";
import MDXVideo from "./components/mdx/MDXVideo";

const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className="text-[var(--text)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold my-7"
    {...props}
  />
);

const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className="text-[var(--text)] text-xl md:text-2xl lg:text-3xl font-semibold my-6"
    {...props}
  />
);

const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className="text-[var(--text)] text-lg md:text-2xl lg:text-2xl font-semibold my-5"
    {...props}
  />
);

const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4
    className="text-[var(--text)] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold my-5"
    {...props}
  />
);

const H5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5
    className="text-[var(--text)] text-sm sm:text-base md:text-lg lg:text-xl font-semibold my-4"
    {...props}
  />
);

const H6 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h6
    className="text-[var(--text)] text-xs sm:text-sm md:text-base lg:text-lg font-semibold my-4"
    {...props}
  />
);

const Paragraph = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className="text-[var(--text)] text-sm sm:text-base md:text-lg my-4 leading-8"
    {...props}
  />
);

const Link = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className="text-[var(--link)] hover:underline"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);

const Blockquote = (props: React.BlockquoteHTMLAttributes<HTMLElement>) => (
  <blockquote
    className="border-l-4 border-[var(--border)] pl-4 italic my-4 text-[var(--accent)] bg-[var(--surface)]"
    {...props}
  />
);

const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    className="bg-[var(--code)] px-1 py-0.5 rounded font-mono text-xs sm:text-sm md:text-base"
    {...props}
  />
);

const UnorderedList = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="text-[var(--text)] list-disc pl-6 my-2" {...props} />
);

const OrderedList = (props: React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol className="text-[var(--text)] list-decimal pl-6 my-2" {...props} />
);

const ListItem = (props: React.HTMLAttributes<HTMLLIElement>) => {
  const isTaskListItem = props.className?.includes("task-list-item");

  return (
    <li
      {...props}
      className={clsx(
        "my-1 break-words overflow-wrap-anywhere max-w-full",
        isTaskListItem && "list-none",
        props.className
      )}
    />
  );
};

const Hr = (props: React.HTMLAttributes<HTMLHRElement>) => (
  <hr className="mb-3 border-t border-[var(--border)]" {...props} />
);

const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-b border-[var(--border)]" {...props} />
);

const TableData = (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className="px-4 py-2 border border-[var(--border)] text-center"
    {...props}
  />
);

const TableHeader = (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className="px-10 py-2 font-semibold text-left border border-[var(--border)]"
    {...props}
  />
);

const LineBreak = (props: React.HTMLAttributes<HTMLBRElement>) => (
  <br className="m-96" {...props} />
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: Paragraph,
    a: Link,
    blockquote: Blockquote,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    hr: Hr,
    code: InlineCode,
    pre: CodeBlock,
    tr: TableRow,
    th: TableHeader,
    td: TableData,
    br: LineBreak,
    Header,
    Footer,
    MDXImage,
    MDXVideo,
    ...components,
  };
}
