import { useEffect, useState } from "react";
import { JobItem } from "./types";

//can re use all logic related to getting the jobitems and the loading
export function useJobItems(searchText: string){
    const [jobItems, setJobItems] = useState<JobItem[]>([]);//cast when the inferred can get you in trouble(never[]) 
    const [isLoading, setIsLoading] = useState(false);//no need to type b/c ts infers

    const jobItemsSliced = jobItems.slice(0,7)

    useEffect(() => {
        setIsLoading(true);
    
        if (!searchText) return; //only fetch when input not empty will avoid fetch onloading b/c of this.
    
        const fetchData = async () => {
          const response = await fetch(
            `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
          );
          const data = await response.json();
          setIsLoading(false);
          setJobItems(data.jobItems);
        };
        fetchData();
      }, [searchText]);

    return [jobItemsSliced, isLoading] as const //leaves no room for interpretation
}
