import { createContext, useCallback, useMemo, useState} from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { ITEMS_PER_PAGE } from "../lib/constants";

type JobItemsContext = {
    jobItemsSliced: JobItem[],
    isLoading: boolean
    jobItemsCount: number
    sortBy: SortBy
    handleSortBy: (sortOption: SortBy) => void;
    currentPage: number
    lastPage: number
    handleChangePage: (pagination: PageDirection) => void
}

export const JobItemsContext = createContext<JobItemsContext | null>(null);

type JobItemsContextProviderProps = {
    children: React.ReactNode
}

export default function JobItemsContextProvider({children}: JobItemsContextProviderProps) {
    //context dependency
    const {debouncedSearchText} = useSearchTextContext()
    //states of the jobItems
    const [jobItems, isLoading] = useSearchQuery(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortBy>('relevant')
    
    //derived states
    const jobItemsSorted = useMemo(() => [...(jobItems || [])].sort((a,b) => {
    if(sortBy === 'recent'){
        return a.daysAgo - b.daysAgo
    }
    else if(sortBy === 'relevant'){
        return b.relevanceScore - a.relevanceScore
    }
    return 0
    }),[jobItems,sortBy])

    const jobItemsSliced = useMemo(() => jobItemsSorted?.slice(
        currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    ) || [], [currentPage, jobItemsSorted])

    const jobItemsCount = jobItems?.length || 0;
    const lastPage = jobItemsCount / ITEMS_PER_PAGE;

    console.log(sortBy)

    //handlers
    const handleChangePage = useCallback(() => (pagination: PageDirection) => {
    if (pagination === "previous") {
        setCurrentPage((prev) => prev - 1);
        
    } else if (pagination === "next") {
        setCurrentPage((prev) => prev + 1);
    }
    },[])

    const handleSortBy = useCallback(() => (sortOption: SortBy) => {
    setSortBy(sortOption)
    setCurrentPage(1)
    },[])

const contextValue = useMemo(() => ({
    jobItemsSliced,
    isLoading, 
    jobItemsCount, 
    sortBy, 
    handleSortBy,
    lastPage,
    currentPage,
    handleChangePage
}), [
    jobItemsSliced,
    isLoading, 
    jobItemsCount, 
    sortBy, 
    handleSortBy,
    lastPage,
    currentPage,
    handleChangePage
])

  return <JobItemsContext.Provider value={contextValue}>
    {children}
  </JobItemsContext.Provider>;
}

