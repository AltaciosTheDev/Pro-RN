import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemContent } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type JobItemApiResponse = {
  public: boolean,
  jobItem: JobItemContent
}

const fetchJobItem = async (id:number) : Promise<JobItemApiResponse> => {
  //not here to avoid cluttering this part up 
  const response = await fetch(`${BASE_API_URL}/${id}`)
  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.description)
  }

  const data = await response.json()
  return data
}

export function useJobItem(id:number | null){
  const {data, isInitialLoading} = useQuery(['jobItem', id], 
    //() => (fetchJobItem(id)), //guard clauses with ts to keep in mind
    () => id ? fetchJobItem(id) : null, //guard clauses with ts to keep in mind
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: !!id, //does not run ato / notVar = false , toggle that = true.
      onError: handleError
    }
  )
  const jobItem = data?.jobItem //optional chaining returns undefined it prop does not exist instead of crashing. 
  const isLoading = isInitialLoading
  return {jobItem, isLoading}

}

//----------------------
// type
type JobItemsApiResponse = {
  public: boolean,
  sorted: boolean,
  jobItems: JobItem[]
}

//function
const fetchJobItems = async (searchText:string): Promise<JobItemsApiResponse> => { //async funcs always return promises
  const response = await fetch(
    `${BASE_API_URL}?search=${searchText}`
  );
  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.description)
  }

  const data = await response.json();
  return data
};

// -- refactor to react-query 

export function useJobItems(searchText: string){
  //state to store jobs
  const {data, isInitialLoading} = useQuery(['job-items', searchText], //var it depends on 
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: !!searchText, //does not run ato / notVar = false , toggle that = true.
      onError: handleError //passes the error automatically 
    }
  )
  const jobItems = data?.jobItems //optional chaining returns undefined it prop does not exist instead of crashing. 
  const isLoading = isInitialLoading
  return {jobItems, isLoading}
}

//------------------------------

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


export function useDebounce<T>(value:T, delay = 500):T{
  const [debouncedValue, setDebouncedValue] = useState(value) 
  
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value),delay)
    
    return () => clearTimeout(timerId)

  },[value,delay])
  
  return debouncedValue
}


// //can re use all logic related to getting the jobitems and the loading
// export function useJobItems(searchText: string){
//     //state to store jobs
//     const [jobItems, setJobItems] = useState<JobItem[]>([]);//cast when the inferred can get you in trouble(never[]) 
//     const [isLoading, setIsLoading] = useState(false);//no need to type b/c ts infers
    
//     //const totalNumberOfResults = jobItems.length
//     //first page
//     //const jobItemsSliced = jobItems.slice(0,7)

//     //side effects here
//     useEffect(() => {
//         //set loading
//         setIsLoading(true);
    
//         //guard clase for empty form
//         if (!searchText) return; //only fetch when input not empty will avoid fetch onloading b/c of this.
    
//         //get data
//         const fetchData = async () => {
//           const response = await fetch(
//             `${BASE_API_URL}?search=${searchText}`
//           );
//           const data = await response.json();
//           setIsLoading(false);
//           setJobItems(data.jobItems);
//         };
//         fetchData();
//       //call again if form changes
//       }, [searchText]);

//     return {jobItems, isLoading}//leaves no room for interpretation
// }



// export function useJobItem(activeId: number | null) {
//   //state to store the job
//   const [jobItem, setJobItem] = useState<JobItemContent | null>(null)
//   const [isLoading, setIsLoading] = useState(false);//no need to type b/c ts infers
    
//     //guard clause if id is null
//     useEffect(() => {
//       if(!activeId) return //remember guard clauses when state can be null initially
      
//       //get data
//       const fetchData = async () => {
//         setIsLoading(true)
//         const response = await fetch(`${BASE_API_URL}/${activeId}`)
//         const data = await response.json()
//         setIsLoading(false);
//         //store data
//         setJobItem(data.jobItem)
  
//       }
//       fetchData()
  
//     //call again is activeId changes
//     },[activeId])//when comp first mounts and when activeId changes

//     return {jobItem, isLoading}

// }

export function useLocalStorage<T> (key:string, initialValue:T): [T,React.Dispatch<React.SetStateAction<T>>] {
  //read from LS
  const [value, setValue] = useState(() => (
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))  //stringified array b/c that is what json expects
  ))

  //writing to LS
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  },[value,key])

  return [
    value, 
    setValue
  ]
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext)
  if(!context){
    throw new Error("useContext(BookmarksContext) must be used within a BookmarksContextProvider")
  }
  
  return context 
}