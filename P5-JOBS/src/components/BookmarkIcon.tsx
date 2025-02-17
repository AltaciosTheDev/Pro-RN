import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";


type BookmarkIconProps = {
  id: number
}

export default function BookmarkIcon({id}: BookmarkIconProps) {
  const {bookmarkIds, handleToggleBookmark} = useBookmarksContext()

  const handleButtonChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    handleToggleBookmark(id)
  }

  return (
    <button className="bookmark-btn" onClick={handleButtonChange}>
      <BookmarkFilledIcon className={bookmarkIds.includes(id) ? "filled" : ""} />
    </button>
  );
}
