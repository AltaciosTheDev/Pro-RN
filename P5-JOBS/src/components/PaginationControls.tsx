import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlProps = {
  onClick: (direction: "next" | "previous") => void;
  previousPage: number;
  nextPage: number;
};

export default function PaginationControls({
  onClick,
  previousPage,
  nextPage,
}: PaginationControlProps) {
  return (
    <section className="pagination">
      <button
        onClick={() => onClick("previous")}
        className="pagination__button"
      >
        <ArrowLeftIcon /> Page {previousPage}
      </button>
      <button onClick={() => onClick("next")} className="pagination__button">
        <ArrowRightIcon /> Page {nextPage}
      </button>
    </section>
  );
}
