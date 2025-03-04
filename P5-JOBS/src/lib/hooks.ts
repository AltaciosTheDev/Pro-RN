import { useEffect, useState } from "react";
import { BASE_URL, ITEMS_PER_PAGE } from "./constants";
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

const fetchJobItemContent =  async (activeId:number | null): Promise<JobItemContent> => {
  const response = await fetch(`${BASE_URL}/${activeId}`)
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json()
  return data?.jobItem
}

export function useJobItemContent(activeId:number | null) {
  
  const {data, isLoading} = useQuery(["job-item", activeId], //run on id change, dep array 
    () => fetchJobItemContent(activeId!), //type assetion 
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!activeId, //on mount condition to run, if id run.
    }
  )
  
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

export function useJobItems (searchText: string) {
    const [jobItems, setJobItems] = useState<JobItem[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    //derived states
    const jobItemsSliced = jobItems.slice(0 ,ITEMS_PER_PAGE)
    const jobItemsCount = jobItems.length

  useEffect(() => {
    if (!searchText) return;
    
    const fetchJobItems = async () => {
      setIsLoading(true)
      const response = await fetch(
        `${BASE_URL}?search=${searchText}`
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data.jobItems);
      setIsLoading(false)
      setJobItems(data.jobItems);
    };
    fetchJobItems();
  }, [searchText]);

  return [jobItemsSliced,isLoading,jobItemsCount] as const
}

