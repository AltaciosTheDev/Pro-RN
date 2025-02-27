type ResultsCountProps = {
  jobItemsCount: number;
};

export default function ResultsCount({ jobItemsCount }: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{jobItemsCount} </span> results
    </p>
  );
}
