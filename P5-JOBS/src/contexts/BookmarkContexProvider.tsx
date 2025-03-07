import { createContext} from "react";
import { useLocalStorage } from "../lib/hooks";

type BookmarkContextProps = {
    bookmarkedIds: number[]
    handleToggleBookmark: (id:number) => void
}

export const BookmarkContext = createContext<BookmarkContextProps | null>(null);

type BookmarkContextProviderProps = {
    children: React.ReactNode
}

export default function BookmarkContexProvider({children}: BookmarkContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage("bookmarkedIds",[])

  console.log(bookmarkedIds);

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

  

  return <BookmarkContext.Provider value={{bookmarkedIds, handleToggleBookmark}}>
    {children}
  </BookmarkContext.Provider>;
}
