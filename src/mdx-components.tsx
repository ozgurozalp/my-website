import { CodeBlock, CodeInline } from "renoun/components";
import type { MDXComponents } from "renoun/mdx";
import { bundledLanguages } from "shiki/bundle/web";

export function useMDXComponents() {
  return {
    code: (props) => {
      return (
        <CodeInline value={props.children as string} language="typescript" />
      );
    },
    pre: (props) => {
      const { value, language } = CodeBlock.parsePreProps(props);
      return (
        <CodeBlock
          allowErrors
          value={value}
          // @ts-expect-error - bundledLanguages is a const object
          language={bundledLanguages[language] ?? language}
        />
      );
    },
  } satisfies MDXComponents;
}
