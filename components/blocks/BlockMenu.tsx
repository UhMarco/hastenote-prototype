import { getCaretCoordinates } from "@/utils/caretHelpers";
import { matchSorter } from "match-sorter";
import { useState, useEffect } from "react";
import { BlockType, blockTypes } from "./Block";

interface BlockMenuProps {
  onSelect: (type: BlockType) => void;
  close: (replace: boolean) => void;
}

export default function BlockMenu(props: BlockMenuProps) {
  const [command, setCommand] = useState("");
  const [selected, setSelected] = useState(0);
  const [items, setItems] = useState([...blockTypes]);
  const [itemToSend, setItemToSend] = useState<BlockType>();

  const handleCommand = (e: KeyboardEvent) => {
    if (e.ctrlKey) return;
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        // Unbelievably hacky but this is how we're getting the selected item.
        // Since setting a state is technically asynchronous, I'm kind of abusing the callbacks
        // in a separate setting function to ensure I'm getting the most up to date state value.
        setSelected(current => {
          setItems(currentItems => {
            // Now sending this to a useEffect to ensure we're not setting states on an unmounted component
            // once we have obtained the up to date data.
            // I really hate how I'm doing this but I don't see another way at the moment.
            setItemToSend(currentItems[current]);
            return currentItems;
          });
          return current;
        });
        break;
      case "Backspace":
        let willClose = false;
        setCommand(current => {
          if (!current) willClose = true;
          current = current.slice(0, -1);
          return current;
        });
        if (willClose) props.close(false);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelected(current => current === 0 ? items.length - 1 : current - 1);
        break;
      case "ArrowDown":
      case "Tab":
        e.preventDefault();
        setSelected(current => current === items.length - 1 ? 0 : current + 1);
        break;
      case "Space":
      case "Escape":
        props.close(false);
        break;
      default:
        setCommand(c => c + e.key);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCommand);
    return () => document.removeEventListener("keydown", handleCommand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handling selection completion.
  useEffect(() => {
    if (!itemToSend) return;
    props.onSelect(itemToSend);
  }, [itemToSend, props]);

  // Update the available types every time the command is altered.
  useEffect(() => {
    setItems(matchSorter(blockTypes, command));
  }, [command]);

  return (
    <div className="absolute flex w-64 h-36 mt-5">
      <div className="bg-slate-50 rounded-lg">
        {items.map((item, key) => (
          <div
            key={key}
            role="button"
            tabIndex={0}
            onClick={() => props.onSelect(item)}
            className={`text-sm font-normal py-2 px-4 border-b-{1px} last:border-b-none hover:bg-slate-200${items.indexOf(item) === selected ? " bg-slate-200 rounded-lg " : ""}hover:cursor-pointer`}
          >{item}</div>
        ))}
      </div>
    </div>
  );
}