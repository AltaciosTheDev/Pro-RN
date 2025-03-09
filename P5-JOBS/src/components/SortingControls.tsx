import { useJobItemsContext } from "../lib/hooks";

export default function SortingControls() {
  const {sortBy, handleSortBy} =  useJobItemsContext()

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        handleSortBy={() => handleSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        handleSortBy={() => handleSortBy("recent")}
        isActive={sortBy === "recent"}
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
