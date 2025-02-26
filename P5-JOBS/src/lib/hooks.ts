import { useEffect, useState } from "react";
import { BASE_URL, ITEMS_PER_PAGE } from "./constants";
import { JobItem } from "./types";


export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(+window.location.hash.substring(1) || null) //if no stored job, null.
  
  console.log(activeId)
  
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

export function useJobItemContent(activeId:number | null) {
    const [jobItemContent, setJobItemContent] = useState()
    
    useEffect(() => {
      if (!activeId) return;

      const fetchJobItemContent = async (activeId:number) => {
        const response = await fetch(`${BASE_URL}/${activeId}`)
  
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json()
        setJobItemContent(data.jobItem)
        console.log(data.jobItem);

      }
      fetchJobItemContent(activeId)
  
    },[activeId])
    return jobItemContent
}

export function useJobItems (searchText: string) {
    const [jobItems, setJobItems] = useState<JobItem[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    //derived states
    const jobItemsSliced = jobItems.slice(0 ,ITEMS_PER_PAGE)

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

  return [jobItemsSliced,isLoading] as const
}

