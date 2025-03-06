import { SortBy } from "../lib/types";

type SortingControlsProps = {
  handleSortBy: (sortOption: SortBy) => void;
  sortOption: SortBy;
};

export default function SortingControls({
  handleSortBy,
  sortOption,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        handleSortBy={() => handleSortBy("relevant")}
        isActive={sortOption === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        handleSortBy={() => handleSortBy("recent")}
        isActive={sortOption === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  handleSortBy: () => void;
  isActive: boolean;
  children: React.ReactNode;
};

function SortingButton({
  handleSortBy,
  isActive,
  children,
}: SortingButtonProps) {
  return (
    <button
      onClick={handleSortBy}
      className={`sorting__button ${isActive ? "sorting__button--active" : ""}`}
    >
      {children}
    </button>
  );
}
