import { CodeBlock, CodeInline, parsePreProps } from "renoun/components";
import type { MDXComponents } from "renoun/mdx";

export const components: MDXComponents = {
  code: (props) => {
    return (
      <CodeInline language="typescript">{props.children as string}</CodeInline>
    );
  },
  pre: (props) => {
    const { children, language } = parsePreProps(props);
    return (
      <CodeBlock showLineNumbers allowErrors shouldFormat language={language}>
        {children}
      </CodeBlock>
    );
  },
} satisfies MDXComponents;

export function useMDXComponents() {
  return components;
}
