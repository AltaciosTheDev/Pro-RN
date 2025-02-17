import { createContext, useEffect, useState } from "react"

export const BookmarksContext = createContext(null)

export default function BookmarksContextProvider({children}) {
    //read from LS
    const [bookmarkIds, setBookmarkIds] = useState<number[]>(() => (
      JSON.parse(localStorage.getItem("bookmarkedIds") || "[]")  //stringified array b/c that is what json expects
    ))

      //handle Toggle Bookmark id
      const handleToggleBookmark = (id: number) => {
        if(bookmarkIds.includes(id)){
          setBookmarkIds((prev) => prev.filter((item) => item != id))
        }
        else{
          setBookmarkIds((prev) => [...prev, id])
        }
      }

    //writing to LS
    useEffect(() => {
      localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkIds))
    },[bookmarkIds])

  return (
    <BookmarksContext.Provider value={{
      bookmarkIds, 
      handleToggleBookmark
    }}>
      {children}
    </BookmarksContext.Provider>
  )
}
