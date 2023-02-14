"use client";

import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { useCallback } from "react";

export default function MarkdownEditor() {
  const onChange = useCallback((value: any, viewUpdate: any) => {
    console.log("value:", value);
  }, []);

  return (
    <div className="playground-container">
      <div className="playground-panel">
        <CodeMirror
          className="cm-outer-container"
          value=""
          extensions={[markdown()]}
          theme={atomone}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
