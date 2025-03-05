import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

type PaginationControlProps = {
  onChangePage: (pagination: "previous" | "next") => void;
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
        <button
          onClick={() => onChangePage("previous")}
          className="pagination__button"
        >
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </button>
      )}
      {currentPage < lastPage && (
        <button
          onClick={() => onChangePage("next")}
          className="pagination__button pagination__button--next"
        >
          Page {currentPage + 1}
          <ArrowRightIcon />
        </button>
      )}
    </section>
  );
}
