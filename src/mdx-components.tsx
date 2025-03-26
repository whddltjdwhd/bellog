import type { MDXComponents } from "mdx/types";
import { Pre } from "./components/Pre";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: Pre,
    ...components,
  };
}
