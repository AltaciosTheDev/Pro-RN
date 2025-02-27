import { useActiveId } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[],
  isLoading: boolean
}

export function JobList({jobItems, isLoading}: JobListProps) {
  const activeId = useActiveId();

  return (
    <ul className="job-list">
      {isLoading && <Spinner/>} 
      {!isLoading && jobItems.map((jobItem) => <JobListItem key={jobItem.id} isActive={activeId === jobItem.id} jobItem={jobItem}/>)} 
    </ul>
  );
}

export default JobList;
//reused in joblist and bookmarks