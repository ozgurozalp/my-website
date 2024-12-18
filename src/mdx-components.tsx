import { CodeBlock, CodeInline } from "renoun/components";
import type { MDXComponents } from "renoun/mdx";

export function useMDXComponents() {
  return {
    code: (props) => {
      return (
        <CodeInline value={props.children as string} language="typescript" />
      );
    },
    pre: (props) => {
      const { value, language, ...rest } = CodeBlock.parsePreProps(props);
      return (
        <CodeBlock
          showLineNumbers
          allowErrors
          shouldFormat
          value={value}
          language={language}
        />
      );
    },
  } satisfies MDXComponents;
}
