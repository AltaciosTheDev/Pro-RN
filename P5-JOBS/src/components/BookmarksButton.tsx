import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useState } from "react";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopOver = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement && 
        !e.target.closest(".bookmarks-btn") &&
        !e.target.closest(".bookmarks-popover")
      )
        setIsOpen(false);
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section>
      <button className="bookmarks-btn " onClick={togglePopOver}>
        bookmarks
        <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover />}
    </section>
  );
}
