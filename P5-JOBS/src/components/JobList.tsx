import { useActiveId } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[],
  isLoading: boolean
}

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId(); //custom hook

  return (
    <ul className="job-list">
      {isLoading && <Spinner/>}
      {!isLoading && jobItems.map((jobItem) => (
        <JobListItem
          key={jobItem.id}
          jobItem={jobItem}
          isActive={jobItem.id === activeId} //compare the id of the mapped item and the activeId in the URL
        />
      ))}
    </ul>
  );
}

export default JobList;
