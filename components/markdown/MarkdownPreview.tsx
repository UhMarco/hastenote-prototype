"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkGemoji from "remark-gemoji";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "./MarkdownPreview.module.css";

export default function MarkdownPreview({ content = "" }: { content?: string; }) {
  return (
    <div className={`p-12 ${styles["markdown-body"]}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, remarkGemoji]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                // @ts-ignore
                style={codeTheme}
                {...props}
              >{String(children).replace(/\n$/, "")}</SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}