import type { MDXComponents } from "mdx/types";
import React from "react";
import { Pre } from "./components/Pre";
import Header from "./components/Header";
import Footer from "./components/Footer";

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h1 className="text-4xl font-bold my-7" {...props} />
);
const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h2 className="text-3xl font-semibold my-6" {...props} />
);
const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h3 className="text-2xl font-semibold my-5" {...props} />
);
const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h4 className="text-xl font-semibold my-5" {...props} />
);
const H5: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h5 className="text-lg font-semibold my-4" {...props} />
);
const H6: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h6 className="text-base font-semibold my-4" {...props} />
);

const Paragraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (
  props
) => <p className="text-base leading-relaxed my-2" {...props} />;

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
    className="bg-gray-200 px-1 py-0.5 rounded font-mono text-sm"
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
    pre: Pre,
    Header: Header,
    Footer: Footer,
    ...components,
  };
}
