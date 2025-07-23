import { useState } from "react";

type PaginationResult<T> = {
  currentItems: T[];
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
};

function usePagination<T>(items: T[], itemsPerPage: number): PaginationResult<T> {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentItems,
    pageCount,
    handlePageClick,
  };
}

export default usePagination;