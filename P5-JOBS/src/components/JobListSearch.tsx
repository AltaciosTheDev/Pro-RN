import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
    const {isLoading, jobItemsSliced} = useJobItemsContext()

  return (
    <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
  )
}
