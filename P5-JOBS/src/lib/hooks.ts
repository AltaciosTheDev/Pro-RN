import { useEffect, useState } from "react";

//can re use all logic related to getting the jobitems and the loading
export function useJobItems(searchText: string){
    const [jobItems, setJobItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return {
        jobItems, 
        setJobItems,
        isLoading
    }
}
