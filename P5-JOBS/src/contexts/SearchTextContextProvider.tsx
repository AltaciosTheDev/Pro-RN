import { createContext, useState} from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContext = {
    debouncedSearchText: string
    setSearchText: React.Dispatch<React.SetStateAction<string>>
    searchText: string
}

export const SearchTextContext = createContext<SearchTextContext | null>(null);

type SearchTextContextProviderProps = {
    children: React.ReactNode
}

export default function SearchTextContextProvider({children}: SearchTextContextProviderProps) {
    const [searchText, setSearchText] = useState<string>("");
    const debouncedSearchText = useDebounce<string>(searchText);
    

  return <SearchTextContext.Provider value={{searchText,debouncedSearchText, setSearchText}}>
    {children}
  </SearchTextContext.Provider>;
}

