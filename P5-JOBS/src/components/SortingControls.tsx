import { SortBy } from "../lib/types";

type SortingControlProps = {
  onClick: (newSortBy: SortBy) => void,
  sortBy: SortBy
}

export default function SortingControls({
  onClick,
  sortBy,
}: SortingControlProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton onClick={() => onClick("relevant")} isActive={sortBy === "relevant"} sortBy={sortBy}/>
      <SortingButton onClick={() => onClick("recent")} isActive={sortBy === "recent"} sortBy={sortBy}/>
    </section>
  );
}

type SortingButtonProps = {
  onClick: () => void 
  sortBy: SortBy;
  isActive: boolean
};


function SortingButton({sortBy,onClick, isActive}: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--relevant ${
        isActive ? "sorting__button--active" : ""
      }`}
    > 
      {sortBy}
    </button>
  );
}
