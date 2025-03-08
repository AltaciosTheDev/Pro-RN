import { forwardRef } from "react";
import { useBookmarkedIdsContext } from "../lib/hooks";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(function(_,ref) {
  const {bookmarkedJobItems, isLoading} = useBookmarkedIdsContext()

  return <div ref={ref} className="bookmarks-popover">
    <JobList jobItems={bookmarkedJobItems} isLoading={isLoading}/>
  </div>;
})

export default BookmarksPopover
