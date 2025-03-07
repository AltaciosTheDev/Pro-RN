import { createContext, useEffect, useState } from "react";

type BookmarkContextProps = {
    bookmarkedIds: number[]
    handleToggleBookmark: (id:number) => void
}

export const BookmarkContext = createContext<BookmarkContextProps | null>(null);

type BookmarkContextProviderProps = {
    children: React.ReactNode
}

export default function BookmarkContexProvider({children}: BookmarkContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => JSON.parse(localStorage.getItem("bookmarkedIds") || "[]"));

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

  useEffect(() => {
    localStorage.setItem('bookmarkedIds', JSON.stringify(bookmarkedIds))
  }, [bookmarkedIds])

  return <BookmarkContext.Provider value={{bookmarkedIds, handleToggleBookmark}}>
    {children}
  </BookmarkContext.Provider>;
}
