"use client";

import { useState, useRef, KeyboardEvent } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import BlockMenu from "./BlockMenu";

interface BlockProps {
  info: StoredBlock;
  updateBlock: (id: string, value: string) => void;
  addBlock: (id: string) => void;
  deleteBlock: (id: string) => void;
  navigateUp: (id: string) => void;
  navigateDown: (id: string) => void;
}

export const blockTypes = ["text", "heading", "divider", "quote", "code", "todo", "bullet", "number", "toggle", "callout"] as const;
export type BlockType = typeof blockTypes[number];

export interface StoredBlock {
  html: string;
  id: string;
  type: BlockType;
}

export default function Block(props: BlockProps) {
  const ref = useRef(null);
  const divRef = useRef(null);
  const html = useRef("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [savedContent, setSavedContent] = useState<string>();

  const tab = "&nbsp;&nbsp;&nbsp;&nbsp;";

  const updateHtml = (content: string) => {
    html.current = content;
    props.updateBlock(props.info.id, content);
  };

  // Every time the content updates, tell the page.
  const handleChange = (event: ContentEditableEvent) => {
    updateHtml(event.target.value);
  };

  // Handle creating, deleting and navigating lines
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        if (e.shiftKey) break;
        let shouldBreak = false;
        setMenuOpen(current => {
          if (current) shouldBreak = true;
          return current;
        });
        if (shouldBreak) break;
        e.preventDefault();
        props.addBlock(props.info.id);
        break;
      case "Backspace":
        // Content must be empty to delete with backspace.
        if (html.current.length && html.current !== "<br>") break;
        e.preventDefault();
        props.deleteBlock(props.info.id);
        break;
      case "Escape":
        // @ts-ignore
        divRef.current.blur();
        break;
      case "ArrowUp":
        if (!e.ctrlKey) break;
        e.preventDefault();
        props.navigateUp(props.info.id);
        break;
      case "ArrowDown":
        if (!e.ctrlKey) break;
        e.preventDefault();
        props.navigateDown(props.info.id);
        break;
      // Allow tabs to be typed
      case "Tab":
        shouldBreak = false;
        setMenuOpen(current => {
          if (current) shouldBreak = true;
          return current;
        });
        if (shouldBreak) break;
        e.preventDefault();
        if (!e.shiftKey) {
          updateHtml(tab + html.current);
        } else {
          if (!html.current.startsWith(tab)) return;
          updateHtml(html.current.replace(tab, ""));
        }
        break;
    }
  };

  const handleClickOffMenu = () => closeMenu(false);

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "/") return;

    // Save content previous to command running.
    setSavedContent(html.current.slice(0, -1));
    setMenuOpen(true);
    document.addEventListener("click", handleClickOffMenu);
  };

  const menuSelectHandler = (type: BlockType) => {
    console.log("turn me into a", type);
    closeMenu(true);
  };

  const closeMenu = (replace: boolean) => {
    setMenuOpen(false);
    console.log("closing");
    if (!replace || !savedContent) return;
    console.log("replacing");

    updateHtml(savedContent);
    setSavedContent(undefined);
    document.removeEventListener("click", handleClickOffMenu);
  };

  return (
    <>
      {menuOpen && <BlockMenu
        onSelect={menuSelectHandler}
        close={closeMenu}
      />}
      <div ref={ref} className="flex flex-row w-128 space-x-5">
        <ContentEditable
          innerRef={divRef}
          className="w-64 hover:bg-gray-100 focus:outline-none"
          html={props.info.html}
          onChange={handleChange}
          id={props.info.id}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <div>{props.info.id}</div>
        <div>{props.info.type}</div>
      </div>
    </>
  );
}