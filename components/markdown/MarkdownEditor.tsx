"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { atomone } from "@uiw/codemirror-theme-atomone";

import Menu from "../page/Menu";
import MarkdownPreview from "./MarkdownPreview";

export default function MarkdownEditor() {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  // TODO: Sort displaying and error.
  const [uploadError, setUploadError] = useState(false);

  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const onChange = useCallback((value: any) => {
    setContent(value);
  }, []);

  const togglePreview = (p: boolean) => {
    setPreview(p);
  };

  const handleUpload = () => {
    setUploadError(false);
    if (!content || uploading) return;
    setUploading(true);
    fetch("/api/notes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content)
    }).then(response => {
      if (response.status === 200) response.json().then(data => router.push(data.slug));
      else setUploadError(true);
      setUploading(false);
    });
  };

  return (
    <>
      <Menu onUpload={handleUpload} togglePreview={togglePreview} />
      {/* Editor */}
      {!preview
        ? // Editor
        <div className="playground-container">
          <div className="playground-panel">
            <CodeMirror
              autoFocus
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
