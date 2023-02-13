export const setCaret = (element: HTMLElement, place: number = -1) => {
  // Create a new range
  const range = document.createRange();
  // Get the selection object
  const selection = window.getSelection()!;
  // Select all the content from the contenteditable element
  range.selectNodeContents(element);
  // Collapse it to the end, i.e. putting the cursor to the end
  if (place === -1) range.collapse(false);
  // Unless provided with a place to go.
  else {
    try {
      range.setStart(element.childNodes[0], place);
      range.collapse(true);
    } catch (e) {
      // Often, we get a TypeError when we're deleting the block. Going to ignore those.
      if (!(e instanceof TypeError)) throw e;
    }
  }
  // Clear all existing selections
  selection.removeAllRanges();
  // Put the new range in place
  selection.addRange(range);
  // Set the focus to the contenteditable element
  element.focus();
};

export function getCaretPosition(element: HTMLElement): number {
  var sel = window.getSelection()!;
  if (!sel.rangeCount) return -1;

  var range = sel.getRangeAt(0);
  var preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  var caretPosition = preCaretRange.toString().length;
  return caretPosition;
}

export const getCaretCoordinates = (): { x: number, y: number; } => {
  let x = 0, y = 0;
  const selection = window.getSelection()!;
  if (selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.left;
      y = rect.top;
    }
  }
  return { x, y };
};