import type { MDXComponents } from "mdx/types";
import { Code } from "@/components/mdx/code";
import React from "react";
import * as Docs from "@/components/mdx/docs";
import { Meta } from "@/components/mdx/meta";

// Default components for MDX files
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override the default components with our custom ones
    pre: ({ children }) => children as React.ReactElement,
    code: ({ children, className }) => {
      // Only use Code component for code blocks (not inline code)
      const isInlineCode = !className;
      if (isInlineCode) {
        return (
          <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {children}
          </code>
        );
      }

      // Extract language from className (format: language-*)
      const language = className?.replace("language-", "");
      return <Code language={language}>{children as string}</Code>;
    },

    // Override paragraph component to prevent invalid nesting
    p: ({ children }) => {
      // Check if children is a single element that should not be wrapped in p
      if (
        React.Children.toArray(children).some(
          (child) =>
            React.isValidElement(child) &&
            /^(pre|div|table)$/.test(
              (child.type as any)?.name || child.type || ""
            )
        )
      ) {
        return <>{children}</>;
      }
      return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
    },
    // Add blockquote styling
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
    // Add table styling
    table: ({ children }) => (
      <div className="not-prose my-6 w-full overflow-x-auto rounded-lg border text-sm [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em]">
        <table className="w-full">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody>
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="m-0 border-t p-0 even:bg-muted/40">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="bg-muted/60 px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 align-top text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),
    // Steve MCP docs building blocks, usable in every page without an import.
    ...Docs,
    Meta,
    // Inherit any custom components passed in
    ...components,
  };
}
