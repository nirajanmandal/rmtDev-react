import { jobItems } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type jobItemsProps = {
  jobItems: jobItems[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: jobItemsProps) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem key={jobItem.id} jobItem={jobItem} />
        ))}
    </ul>
  );
}

export default JobList;
