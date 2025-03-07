import {TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState } from "react";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopOver = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <section>
      <button className="bookmarks-btn " onClick={togglePopOver}>
        bookmarks
        <TriangleDownIcon/>
      </button>
      {isOpen && <BookmarksPopover/>}      
    </section>
  );
}
