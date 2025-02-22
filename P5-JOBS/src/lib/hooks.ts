import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "./constants";

export function useJobItems (searchText: string) {
    const [jobItems, setJobItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    //derived states
    const jobItemsSliced = jobItems.slice(0 ,ITEMS_PER_PAGE)

  useEffect(() => {
    if (!searchText) return;
    
    const fetchJobItems = async () => {
      setIsLoading(true)
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
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

  return {
    jobItemsSliced,
    isLoading
  }
}
