import { useEffect, useState } from "react";
import { BASE_URL} from "./constants";
import { JobItem, JobItemContent } from "./types";
import { useQuery } from "@tanstack/react-query";


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

//new: react-query
export function useJobItemContent(activeId:number | null) {
  
  const {data, isInitialLoading} = useQuery(["job-item", activeId], //run on id change, dep array 
    () => fetchJobItemContent(activeId!), //type assetion 
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!activeId,//on mount condition to run, if id run.
      onError: (error) => {
        console.log(error)
      } 
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
export function useJobItems (searchText: string) {
  const {data, isInitialLoading} = useQuery(["job-items",searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,//on mount condition to run, if id run.
      onError: (error) => {
        console.log(error)
      } 
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

