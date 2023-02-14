"use client";

import { useState, useCallback } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { atomone } from "@uiw/codemirror-theme-atomone";

import Menu from "../page/Menu";
import MarkdownPreview from "./MarkdownPreview";

export default function MarkdownEditor() {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const onChange = useCallback((value: any, viewUpdate: any) => {
    setContent(value);
  }, []);

  const togglePreview = (p: boolean) => {
    setPreview(p);
  };

  return (
    <>
      <Menu togglePreview={togglePreview} />
      {/* Editor */}
      {!preview
        ? // Editor
        <div className="playground-container">
          <div className="playground-panel">
            <CodeMirror
              className="cm-outer-container"
              value={content}
              extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
              theme={atomone}
              spellCheck={false}
              onChange={onChange}
            />
          </div>
        </div>
        : // Preview
        <MarkdownPreview content={content} />
      }
    </>
  );
}
