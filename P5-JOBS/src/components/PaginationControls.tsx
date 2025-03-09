import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

export default function PaginationControls() {
  const {currentPage,handleChangePage,lastPage} = useJobItemsContext()

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction={"previous"}
          page={currentPage}
          onChangePage={handleChangePage}
        />
      )}
      {currentPage < lastPage && (
        <PaginationButton
          direction={"next"}
          page={currentPage}
          onChangePage={handleChangePage}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PageDirection;
  onChangePage: (pagination: PageDirection) => void;
  page: number;
};

function PaginationButton({
  direction,
  page,
  onChangePage,
}: PaginationButtonProps) {
  return (
    <button
      onClick={() => onChangePage(direction)}
      className={`pagination__button ${
        direction == "next" ? "pagination__button--next" : ""
      }`}
    >
      {direction === "previous" && (
        <>
          Page {page - 1}
          <ArrowLeftIcon />
        </>
      )}

      {direction === "next" && (
        <>
          Page {page + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
