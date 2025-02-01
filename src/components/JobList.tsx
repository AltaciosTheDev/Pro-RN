import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return (
    <ul className="job-list">
      {jobItems.map((job) => (
        <JobListItem
          key={job.id}
          jobItem={job}
        />
      ))}
    </ul>
  );
}

export default JobList;
