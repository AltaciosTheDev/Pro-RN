import { createContext} from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemContent } from "../lib/types";

type BookmarkContextProps = {
    bookmarkedIds: number[]
    handleToggleBookmark: (id:number) => void
    bookmarkedJobItems: JobItemContent[],
    isLoading: boolean
}

export const BookmarkContext = createContext<BookmarkContextProps | null>(null);

type BookmarkContextProviderProps = {
    children: React.ReactNode
}

export default function BookmarkContexProvider({children}: BookmarkContextProviderProps) {
  //logic encapsulating the stored [ids]
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>("bookmarkedIds",[])
  // Create hook that will fetch several jobItems based on Ids
  const [bookmarkedJobItems, isLoading] = useJobItems(bookmarkedIds);


  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((bookmarkedIds) => {
      if (!bookmarkedIds.includes(id)) {
        //id is not included in bookmarks
        return [...bookmarkedIds, id]; //add id to bookmarks
      } else {
        //remove id from bookmarks
        return bookmarkedIds.filter((bookmarkedId) => bookmarkedId !== id);
      }
    });
  };

  return <BookmarkContext.Provider value={{bookmarkedIds, handleToggleBookmark,
    bookmarkedJobItems, isLoading
  }}>
    {children}
  </BookmarkContext.Provider>;
}
