import { useEffect, useState } from "react";
import { JobItem, JobItemContent } from "./types";
import { BASE_API_URL } from "./constants";

//can re use all logic related to getting the jobitems and the loading
export function useJobItems(searchText: string){
    //state to store jobs
    const [jobItems, setJobItems] = useState<JobItem[]>([]);//cast when the inferred can get you in trouble(never[]) 
    const [isLoading, setIsLoading] = useState(false);//no need to type b/c ts infers

    //first page
    const jobItemsSliced = jobItems.slice(0,7)

    //side effects here
    useEffect(() => {
        //set loading
        setIsLoading(true);
    
        //guard clase for empty form
        if (!searchText) return; //only fetch when input not empty will avoid fetch onloading b/c of this.
    
        //get data
        const fetchData = async () => {
          const response = await fetch(
            `${BASE_API_URL}?search=${searchText}`
          );
          const data = await response.json();
          setIsLoading(false);
          setJobItems(data.jobItems);
        };
        fetchData();
      //call again if form changes
      }, [searchText]);

    return [jobItemsSliced, isLoading] as const //leaves no room for interpretation
}

export function useActiveId() {

  //state to store id
    const [activeId, setActiveId] = useState<number | null>(null)
    
    //a tag will store id in url
    //listen and react when the hash changes
    useEffect(() => {
      const handleHashChange = () => {
        const id = +window.location.hash.slice(1)//converts to number
        //store new value in state
        setActiveId(id)
      }
      handleHashChange()

      //call for function
      window.addEventListener("hashchange",handleHashChange)
  
      //clean this event listener
      return () => {
        window.removeEventListener("hashchange", handleHashChange)
      }
    },[])

  return activeId
}

export function useJobItem(activeId: number | null) {
  //state to store the job
  const [jobItem, setJobItem] = useState<JobItemContent | null>(null)
  const [isLoading, setIsLoading] = useState(false);//no need to type b/c ts infers
    
    //guard clause if id is null
    useEffect(() => {
      if(!activeId) return //remember guard clauses when state can be null initially
      
      //get data
      const fetchData = async () => {
        setIsLoading(true)
        const response = await fetch(`${BASE_API_URL}/${activeId}`)
        const data = await response.json()
        setIsLoading(false);
        //store data
        setJobItem(data.jobItem)
  
      }
      fetchData()
  
    //call again is activeId changes
    },[activeId])//when comp first mounts and when activeId changes

    return [jobItem, isLoading] as const
}