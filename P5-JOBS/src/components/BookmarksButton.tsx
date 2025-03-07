import {TriangleDownIcon } from "@radix-ui/react-icons";

type BookmarksButtonProps = {
  togglePopOver: () => void
}

export default function BookmarksButton({togglePopOver}: BookmarksButtonProps) {
  return (
    <section>
      <button className="bookmarks-btn " onClick={togglePopOver}>
        bookmarks
        <TriangleDownIcon/>
      </button>
      
    </section>
  );
}
