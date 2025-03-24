import { ITEMS_PER_PAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const btnStyles =
  "justify-center flex items-center gap-2 text-white px-5 py-3 bg-white/5 rounded-lg opacity-75 hover:opacity-100 transition text-sm";

type PaginationControlProps = {
  previousPath: string
  nextPath: string
  itemsOnPage: number
}

export default function PaginationControls({
  previousPath,
  nextPath,
  itemsOnPage,
}: PaginationControlProps) {
  return (
    <section className="flex w-full justify-between">
      {previousPath && (
        <Link href={previousPath} className={cn(btnStyles, "mr-auto")}>
          <ArrowLeftIcon /> Previous
        </Link>
      )}

      {itemsOnPage >= ITEMS_PER_PAGE && (
        <Link href={nextPath} className={cn(btnStyles, "ml-auto")}>
          Next <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}
