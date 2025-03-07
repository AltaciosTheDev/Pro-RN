import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkedIdsContext } from "../lib/hooks";


type BookmarkIconProps = {
jobItemId: number
}

export default function BookmarkIcon({jobItemId}: BookmarkIconProps) {
  const {bookmarkedIds, handleToggleBookmark} = useBookmarkedIdsContext()
  return (
    <button className="bookmark-btn" onClick={() => handleToggleBookmark(jobItemId)}>
      <BookmarkFilledIcon className={bookmarkedIds.includes(jobItemId) ? "filled" : ""}/>
    </button>
  );
}
