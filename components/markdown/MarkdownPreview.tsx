"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkGemoji from "remark-gemoji";
import rehypeHighlight from "rehype-highlight";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";

import styles from "./MarkdownPreview.module.css";

export default function MarkdownPreview({ content = "" }: { content?: string; }) {
  return (
    <div className={`p-12 text-white ${styles["markdown-body"]}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, remarkGemoji, rehypeHighlight, rehypeMinifyWhitespace]}>{content}</ReactMarkdown>
    </div>
  );
}
