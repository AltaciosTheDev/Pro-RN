import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";

type PaginationControlProps = {
  onChangePage: (pagination: PageDirection) => void;
  currentPage: number;
  lastPage: number;
};

export default function PaginationControls({
  onChangePage,
  currentPage,
  lastPage,
}: PaginationControlProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction={"previous"}
          page={currentPage}
          onChangePage={onChangePage}
        />
      )}
      {currentPage < lastPage && (
        <PaginationButton
          direction={"next"}
          page={currentPage}
          onChangePage={onChangePage}
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
