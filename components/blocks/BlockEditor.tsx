"use client";

import { setCaret } from "@/utils/caretHelpers";
import { useEffect, useState } from "react";
import Block, { StoredBlock } from "./Block";

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


export default function BlockEditor() {
  const [blocks, setBlocks] = useState<StoredBlock[]>([]);

  const [added, setAdded] = useState<string | null>();

  useEffect(() => {
    if (!added) return;
    document.getElementById(added)?.focus();
    setAdded(null);
  }, [added]);

  const updateBlock = (id: string, content: string) => {
    setBlocks((current) => {
      const index = current.map((b) => b.id).indexOf(id);
      const block = current.at(index);
      if (!block) return current;
      block!.html = content;
      return [...current];
    });
  };


  const addBlock = (id?: string) => {
    const newBlock: StoredBlock = { id: uid(), html: "", type: "text" };
    setBlocks((current) => {
      if (id) {
        const index = current.map((b) => b.id).indexOf(id);
        const updatedBlocks = [...current];
        updatedBlocks.splice(index + 1, 0, newBlock);
        return updatedBlocks;
      } else return [...blocks, newBlock];
    });
    setAdded(newBlock.id);
  };

  const deleteBlock = (id?: string) => {
    setBlocks((current) => {
      if (!id) return [];
      const index = current.map((b) => b.id).indexOf(id);
      current.splice(index, 1);
      if (current.at(index - 1) && document.getElementById(current.at(index - 1)!.id)) {
        setCaret(document.getElementById(current.at(index - 1)!.id)!);
      }
      console.log(current);

      return [...current];
    });
  };

  const navigateUp = (id: string) => {
    const index = blocks.map((b) => b.id).indexOf(id);
    if (!index) return;
    // TODO
  };

  const navigateDown = (id: string) => {
    // const index = blocks.map((b) => b.id).indexOf(id);
    // TODO
  };

  return (
    <div className="p-5">
      {blocks.length
        ? blocks.map((block, key) => (
          <Block
            key={key}
            info={block}
            updateBlock={updateBlock}
            addBlock={addBlock}
            deleteBlock={deleteBlock}
            navigateUp={navigateUp}
            navigateDown={navigateDown}
          />
        ))
        : <button onClick={() => addBlock()}>add block</button>
      }
    </div>
  );
}