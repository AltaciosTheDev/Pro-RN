import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import {useRef, useState } from "react";
import { useClickOutside } from "../lib/hooks";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  
  const togglePopOver = () => {
    setIsOpen((prev) => !prev);
  };

  //Will run whenever we click outside the button or the popover to close the popover
  useClickOutside([buttonRef,popoverRef], () => setIsOpen(false))

  return (
    <section>
      <button ref={buttonRef} className="bookmarks-btn " onClick={togglePopOver}>
        bookmarks
        <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
