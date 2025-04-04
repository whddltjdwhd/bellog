import type { MDXComponents } from "mdx/types";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CodeBlock from "./components/CodeBlock";
import MDXImage from "./components/MDXImage";

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h1
    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold my-7"
    {...props}
  />
);
const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h2
    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold my-6"
    {...props}
  />
);
const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h3
    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold my-5"
    {...props}
  />
);
const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h4
    className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold my-5"
    {...props}
  />
);
const H5: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h5
    className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold my-4"
    {...props}
  />
);
const H6: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h6
    className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold my-4"
    {...props}
  />
);

const Paragraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (
  props
) => (
  <p className="text-sm sm:text-base md:text-lg my-4 leading-8" {...props} />
);

const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => <a className="text-indigo-800 hover:underline" {...props} />;

const Blockquote: React.FC<React.BlockquoteHTMLAttributes<HTMLElement>> = (
  props
) => (
  <blockquote
    className="border-l-4 border-gray-300 pl-4 italic my-4 text-amber-50"
    {...props}
  />
);

const InlineCode: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => (
  <code
    className="bg-gray-200 px-1 py-0.5 rounded font-mono text-xs sm:text-sm md:text-base"
    {...props}
  />
);

const UnorderedList: React.FC<React.HTMLAttributes<HTMLUListElement>> = (
  props
) => <ul className="list-disc pl-6 my-2" {...props} />;
const OrderedList: React.FC<React.OlHTMLAttributes<HTMLOListElement>> = (
  props
) => <ol className="list-decimal pl-6 my-2" {...props} />;
const ListItem: React.FC<React.HTMLAttributes<HTMLLIElement>> = (props) => (
  <li className="my-1" {...props} />
);

const Hr: React.FC<React.HTMLAttributes<HTMLHRElement>> = (props) => (
  <hr className="mb-3 border-t border-gray-800" {...props} />
);

const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = (
  props
) => <tr className="border-b" {...props} />;

const TableData: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = (
  props
) => <td className="px-4 py-2 border text-center" {...props} />;

const TableHeader: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = (
  props
) => <th className="px-10 py-2 font-semibold text-left border" {...props} />;

const LineBreak: React.FC<React.HTMLAttributes<HTMLBRElement>> = (props) => (
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
    ...components,
  };
}
