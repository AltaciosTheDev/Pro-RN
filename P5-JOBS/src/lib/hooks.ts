import { useContext, useEffect, useState } from "react";
import { BASE_URL} from "./constants";
import { JobItem, JobItemContent } from "./types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleUnknownError } from "./utils";
import { BookmarkContext } from "../contexts/BookmarkContexProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";


//hook to close any modal or popover when clicking outside. Pass refs needed and handler function
export function useClickOutside(refs:React.RefObject<HTMLElement>[], handler: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement && 
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      )
        handler()
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}

//hook to read and write any value to / from local storage. Pass key and initial value.
export function useLocalStorage<T>(key:string, initialValue:T):[T, React.Dispatch<React.SetStateAction<T>>] {
  //define state | retrieve from LS
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)));

  //save state to LS
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as const
}

//hook that encapsulates undefined / null logic of jobItems
export const useJobItemsContext = () => {
  const context = useContext(JobItemsContext)

  if (!context) {
    throw new Error(
      "JobItemsContext needs to be used inside the provider"
    );
  }
  return context;
}


//hook that encapsulates undefined / null logic of searchTextContext
export const useSearchTextContext = () => {
  const context = useContext(SearchTextContext)

  if (!context) {
    throw new Error(
      "useSearchTextContext needs to be used inside the provider"
    );
  }
  return context;
}


//hook that encapsulates undefined / null logic of bookmarksidscontext
export const useBookmarkedIdsContext = () => {
  const context = useContext(BookmarkContext)

  if (!context) {
    throw new Error(
      "useBookmarkedIdsContext needs to be used inside the provider"
    );
  }
  return context;
}

//hook that encapsulates undefined / null logic of activeIdcontext
export const useActiveIdContext = () => {
  const context = useContext(ActiveIdContext)

  if (!context) {
    throw new Error(
      "useActiveIdContext needs to be used inside the provider"
    );
  }
  return context;
}

//hook that encapsulates logic for storing the active id and listening for a change on it. 
export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null) //if no stored job, null.
  
  //console.log(activeId)
  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(+window.location.hash.substring(1))
    }
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  },[])
  
  return activeId
}

//fetch function for useJobItemContent
const fetchJobItemContent =  async (activeId:number | null): Promise<JobItemContent> => {
  const response = await fetch(`${BASE_URL}/${activeId}`)
  if (!response.ok) {
    //4xx or 5xx
    const errorData = await response.json()
    throw new Error(errorData.description);
  }//making use of the existing guard clause helps me not need another one
  const data = await response.json()
  return data.jobItem //will always have data 
}

//use queries: fetch multiple queries based on parameters(based on below func but plural)
export function useJobItems(ids: number[]){
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItemContent(id!),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,//on mount condition to run, if id run.
      onError: handleUnknownError // auto passed parameter
    })),
  })
  //console.log(results)
  const isLoading = results.some((result) => result.isLoading)//returns true if at least 1
  const jobItems = results.map((result) => result.data).filter((jobItem) => !!jobItem)

  return [jobItems, isLoading] as const
}

//new: react-query
export function useJobItemContent(activeId:number | null) {
  
  const {data, isInitialLoading} = useQuery(["job-item", activeId], //run on id change, dep array 
    () => fetchJobItemContent(activeId!), //type assetion 
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!activeId,//on mount condition to run, if id run.
      onError: handleUnknownError // auto passed parameter
    }
  )
  const isLoading = isInitialLoading
  return [data, isLoading] as const
}

//------------ useJobItemContent V1 - useEffect--------------
// export function useJobItemContent(activeId:number | null) {
//   const [jobItemContent, setJobItemContent] = useState<JobItemContent | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
    
//     useEffect(() => {
//       if (!activeId) return;

//       const fetchJobItemContent = async (activeId:number) => {
//         setIsLoading(true)
//         const response = await fetch(`${BASE_URL}/${activeId}`)
  
//         if (!response.ok) {
//           throw new Error();
//         }
//         const data = await response.json()
//         setJobItemContent(data.jobItem)
//         setIsLoading(false)
//         console.log(data.jobItem);

//       }
//       fetchJobItemContent(activeId)
  
//     },[activeId])
//     return [jobItemContent, isLoading] as const
// }
// ---------------------------------------------------------------

//hook for debouncing any value by a sepcific ammount of time. Pass value and delay time.
export function useDebounce<T>(value:T,delay = 1000):T{
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timerId)
  },[value,delay])

  return debouncedValue
}

//fetch function for useJobItems
const fetchJobItems = async (searchText: string): Promise<JobItem[]> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    //4xx or 5xx
    const errorData = await response.json()
    throw new Error(errorData.description);
  }
  const data = await response.json();
  console.log(data)
  return data.jobItems
};

//new: react-query
export function useSearchQuery (searchText: string) {
  const {data, isInitialLoading} = useQuery(["job-items",searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,//on mount condition to run, if id run.
      onError: handleUnknownError // auto passed parameter

    }
  )
  // `isLoading` tracks ongoing fetches, including initial and subsequent requests
  // `isFetching` is used to track refetches and background loading
  const isLoading = isInitialLoading
  
  return [data, isLoading] as const
}

//------------ useJobItems V1 - useEffect--------------
// export function useJobItems (searchText: string) {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false)

// useEffect(() => {
//   if (!searchText) return;
  
//   const fetchJobItems = async () => {
//     setIsLoading(true)
//     const response = await fetch(
//       `${BASE_URL}?search=${searchText}`
//     );
//     if (!response.ok) {
//       throw new Error();
//     }
//     const data = await response.json();
//     console.log(data.jobItems);
//     setIsLoading(false)
//     setJobItems(data.jobItems);
//   };
//   fetchJobItems();
// }, [searchText]);

// return [jobItems,isLoading] as const
// }
// ---------------------------------------------------------------

